Chapter 4: Design

This chapter sets out the system design of PhishShield AI. It takes the requirements from Chapter 1, the research gaps from Chapter 2, and the methodology from Chapter 3 and turns them into a concrete architecture and component design. The design phase came before implementation and defined the structure the prototype was built within. What follows explains what was designed, why certain choices were made, and how the design meets the research objectives.

4.1 Design Approach and Requirements Traceability

Project objectives and research gaps shaped the design. Chapter 2 showed that postsession behavioural monitoring is underexplored, that heuristic based scoring of interaction patterns works in practice, and that user facing risk communication needs explicit design. Chapter 3 described an iterative development approach with components built in phases.

Each design decision links back to a requirement. Chapter 1 Objective 2 called for a system that captures clicks, keypresses, scroll depth, and timing. Objective 3 called for a simulated phishing environment, a backend for storage and analysis, a heuristic risk scoring engine, and a dashboard. The five research gaps—postsession deficit, real time capability, user facing communication, lightweight architecture, phishing specific detection—guided architectural and interface choices. No formal wireframes or paper prototypes were used; the design emerged through iterative refinement during implementation, with each component specified in enough detail to guide development.

4.1.1 Use Case Diagram

PhishShield AI has one main actor: the user participating in the phishing simulation. The user browses the simulated phishing page and performs actions such as searching, clicking shortcuts, and entering text. The system captures these interactions and sends them to the backend. The user can also open the dashboard to view session data and risk analysis. Figure 4.1 shows the use case diagram, with the user actor and the key functions: interact with phishing simulation, view session dashboard, and view risk analysis.

4.2 System Architecture

PhishShield AI uses a three tier architecture: a client side phishing simulation, a backend service for event storage and analysis, and a dashboard for risk visualisation. Figure 4.2 shows the high level system architecture.

4.2.1 Architectural Overview

The system follows a capture, store, analyse, report flow. The phishing simulation runs in the user's browser and captures behavioural events as the user interacts. Events go to the backend over HTTP. The backend stores events in a database and runs postsession analysis when requested. The dashboard fetches events and analysis results and presents them to the user. Analysis is event driven: it runs when the user opens the dashboard or when a session end is detected, rather than continuously during browsing. This keeps performance overhead low and fits the lightweight, postsession approach described in the literature review.

4.2.2 Component Responsibilities

The phishing simulation presents a familiar browser like interface that mimics search and login flows users recognise. It attaches DOM event listeners to capture clicks, keypresses, and scroll depth. Each event is timestamped and tied to a session identifier. Events are sent to the backend using the sendBeacon API or fetch with keepalive, so they are delivered even when the user navigates away.

The backend receives events, stores them in the database, and computes risk analysis per session. It exposes RESTful endpoints for event submission and for retrieving events and analysis results. Risk scoring runs on demand when analysis is requested for a session.

The dashboard shows session data, risk scores, and contributing factors. It lets users select sessions and view event timelines. Risk output uses plain language with classifications (Normal, Moderate risk, Suspicious) and a list of factors that influenced the score.

4.3 Component Design

4.3.1 Phishing Simulation

The phishing simulation is a single page HTML application with embedded JavaScript. It mimics a browser new tab styled to resemble Google's dark theme, with a search bar, navigation controls, and shortcut tiles for services such as Gmail, Outlook, Drive, Maps, YouTube, and Docs. Each shortcut leads to a simulated destination: a search results page or a login prompt. The interface aims to feel familiar and inviting so users click, type, and scroll in ways that reflect normal or rushed behaviour.

Event capture uses native DOM events. A session identifier is generated when the page loads. The captured events are: first interaction (the first click or keypress, with time since page load), click (element type and context), keydown (key presses), and scroll depth (maximum percentage of page scrolled). Event handlers record the data and send it to the backend via POST requests. The first interaction event is emitted only once per session and includes the latency from page load to first action, which is a key heuristic for rushed behaviour.

4.3.2 Backend Service

The backend runs on Spring Boot. It provides a REST API for behaviour events and session analysis. The main endpoints are: POST for event submission, GET for listing events (optionally filtered by session), and GET for session analysis. The analysis endpoint computes a risk score and classification from the events for the requested session.

Event persistence uses an H2 in memory or file based database. Each event is stored with session identifier, event type, timestamp, and a JSON payload containing event specific data. The schema supports multiple event types and allows efficient querying by session.

4.3.3 Risk Scoring Engine

The risk scoring engine sits inside the backend. It takes the list of events for a session and computes a numeric risk score (e.g. 0 to 100) and a classification (Normal, Moderate risk, Suspicious). The logic is rule based and uses these behavioural features:

- Time to first interaction: A very short time (e.g. under 2 seconds) suggests the user acted without reading, which can indicate rushed or habitual behaviour.
- Scroll depth: Low maximum scroll depth combined with input activity (keypresses) suggests the user may have entered credentials or searched without reading the page.
- Action density: A high number of clicks and keypresses in a short period may indicate rushed or automated like behaviour.
- Session duration: Short sessions with high input activity may reflect credential focused behaviour.

Each heuristic contributes to the overall score. The engine produces a list of contributing factors in plain language (e.g. "Very fast first interaction", "Low scroll depth with high input activity") so users can see why a session was flagged.

4.3.4 Dashboard

The dashboard is a static HTML page with JavaScript. It fetches events from the backend and, for the selected session, fetches the analysis result. It displays a risk card with the score and classification, a list of contributing factors, and an event timeline. Session selection lets users compare multiple sessions. The design emphasises clarity: risk levels are colour coded (green for normal, amber for moderate, red for suspicious), and factors are listed as bullet points.

4.4 Data Model and Event Schema

The backend stores behavioural events in an H2 database. The schema supports session identifiers, event types, timestamps, and JSON payloads for event specific data. Figure 4.3 shows the database schema (SQL entity relationship).

Events are JSON objects with a common structure. Each event includes: sessionId (string), timestamp (milliseconds since epoch), and an event specific payload. The payload structure varies by event type.

For first_interaction, the payload includes: type, interactionType (click or keydown), and timeSincePageLoadMs. For click events, the payload includes element tag and context. For keydown events, the payload indicates a key press occurred (key values are not stored to avoid capturing sensitive input). For scroll_depth events, the payload includes the maximum scroll depth percentage reached.

The backend normalises and stores these events. The analysis component aggregates them per session to compute time to first interaction, maximum scroll depth, click count, keypress count, and session duration. These aggregated values feed into the heuristic rules.

4.5 User Interface Design

4.5.1 Phishing Simulation Interface

The phishing simulation interface replicates the look and feel of a familiar browser new tab. A Google style interface was chosen because the literature shows that phishing pages often mimic search engines and email providers (Jakobsson and Myers, 2006; Wu et al., 2006). The dark theme, search bar, and shortcut tiles create a credible context for interaction. Users can search, click shortcuts, and navigate to simulated login pages. The interface does not reveal that it is a simulation; to the user it behaves like a normal browser start page. This supports realistic behaviour capture for research and training.

4.5.2 Dashboard Interface

The dashboard was built to communicate risk clearly and without technical jargon. Chapter 2 noted that users struggle with technical security information and experience warning fatigue. The design uses a prominent risk score and classification, colour coded severity indicators, and a list of contributing factors in plain language. Users can see not only that a session was flagged but why. The event timeline adds transparency: users can inspect the raw interaction sequence. The session selector allows comparison across sessions, which helps users understand how different behaviour patterns lead to different risk levels.

4.6 Design Decisions and Rationale

4.6.1 Postsession vs Real Time Analysis

Analysis runs only when the user opens the dashboard or the session ends. Real time analysis during browsing would mean processing every event as it happens, increasing latency and resource use. Postsession analysis lets the backend process the full event sequence at once and avoids affecting the user's browsing. This fits the efficiency considerations from the literature review and supports the lightweight architecture objective.

4.6.2 Heuristic Based vs Machine Learning Scoring

The design uses rule based heuristics instead of machine learning. Heuristics are interpretable: each contributing factor can be explained. They need no training data or model deployment. For a prototype aimed at feasibility and user comprehension, heuristics were a better fit. The architecture leaves room for ML based analysis to be added later for ambiguous cases, as Chapter 2 suggested.

4.6.3 Simulated Environment vs Live Phishing Pages

The design uses a simulated phishing environment rather than monitoring users on live phishing sites. Simulation gives ethical control: no real credentials are at risk, and all interaction stays within a research context. It also allows consistent scenarios for evaluation. The interface mimics real phishing targets (search, email, cloud storage) to elicit comparable behaviour.

4.6.4 Event Driven Analysis Trigger

Analysis is triggered when the user opens the dashboard or when a session end event is recorded. This event driven approach balances timeliness with efficiency. Users get feedback when they look at the dashboard or when the system detects session completion. Continuous analysis was ruled out because of performance; batch only analysis was ruled out so that feedback could be timely.

4.7 Alignment with Research Gaps

The design addresses all five research gaps from Chapter 2. Gap 1 (postsession behavioural monitoring deficit): the system captures and analyses behaviour during and after sessions on phishing like pages. Gap 2 (real time detection capability): event driven analysis gives timely feedback when the dashboard is used. Gap 3 (user facing risk communication): the dashboard presents scores, classifications, and factors in user friendly terms. Gap 4 (lightweight detection architectures): the client sends events with minimal overhead and analysis runs on demand. Gap 5 (phishing specific behavioural detection): heuristics focus on credential focused, rushed, and high input patterns from the literature.

4.8 Chapter Summary

This chapter described the system design of PhishShield AI. The three tier architecture (phishing simulation, backend, dashboard) supports capture at the client, analysis at the server, and user facing risk communication. The design uses rule based heuristics for risk scoring, postsession and event driven analysis, and a simulated phishing environment for ethical and controlled evaluation. Key design decisions were justified with reference to the literature and project objectives. The next chapter describes the implementation.


Figures Referenced in This Chapter

Figure 4.1 Use case diagram: primary actor (user) and use cases (interact with phishing simulation, view session dashboard, view risk analysis).

Figure 4.2 System architecture diagram: three tier architecture showing phishing simulation (client), backend service (Spring Boot, H2), and dashboard, with data flow between components.

Figure 4.3 Database schema: SQL structure for storing behavioural events (session identifier, event type, timestamp, payload).
