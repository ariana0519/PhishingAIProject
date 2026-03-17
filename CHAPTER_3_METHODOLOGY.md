Chapter 3: Methodology

3.1 Overview of the Methodology

PhishShield AI is a software based applied research project. The aim is to design, build, and evaluate a prototype that flags phishing relevant behaviour when users interact with simulated phishing pages. Behaviour is captured at runtime, sent to a backend, analysed for suspicious patterns, and shown back to the user as risk indicators.

The project runs in cycles: design, implementation, testing, and evaluation. Runtime behavioural data comes from a controlled browser environment where users interact with a simulated phishing style page. A backend service processes the events, analyses them for suspicious patterns, and presents the results through risk indicators. The methodology prioritises practicality: low system overhead, interpretability (so users can understand why something was flagged), and suitability for real world browser environments.

At a high level, the system does four things: monitors interaction on the simulated page, collects events in real time, analyses behaviour and assigns a risk score, and reports that score along with the factors that contributed to it.

3.2 Methodology Selection and Justification

3.2.1 Methodology Candidates

The project needed a development approach that could handle changing requirements and still deliver something evaluable for a dissertation. Four options were considered: Waterfall, Spiral, Lean, and Agile. These were chosen because they are widely used in software engineering and are familiar in academic projects.

Waterfall follows a linear, sequential structure. Each phase (requirements, design, implementation, testing) is completed before the next begins. It works best when requirements are fixed and well defined from the start (Royce, 1970; Sommerville, 2015). Spiral emphasises risk analysis and iterative refinement; it is commonly used in large or high risk systems where early identification of problems matters (Boehm, 1988). Lean development focuses on minimising waste and rapid delivery; it is often applied in startup or industrial settings (Poppendieck and Poppendieck, 2003). Agile supports iterative development, continuous feedback, and incremental improvements. It is built around short cycles, frequent delivery, and regular reflection (Beck et al., 2001; Sommerville, 2015).

3.2.2 Comparative Evaluation

Requirements did not stay fixed. As the project progressed, behavioural features, detection logic, and performance considerations were refined through experimentation. What the system needed to capture, and how it should score behaviour, became clearer only after building and testing parts of it. Waterfall was therefore unsuitable: its rigid, phase based structure does not accommodate that kind of change (Sommerville, 2015).

Spiral was considered for its risk focus and iteration. For a project of this scope, however, it would have introduced more process than was useful. The formal risk analysis loops and documentation overhead did not seem justified. Lean appealed for its efficiency and emphasis on delivery. The drawback was its relative lack of focus on documentation and formal evaluation. A dissertation requires both; Lean tends to underplay them.

Agile made sense in many ways. It supports prototyping, incremental delivery, and changing requirements (Beck et al., 2001). The problem is that Agile is built around teams. Daily standups, sprint planning, retrospectives, and similar ceremonies assume more than one person. They do not translate well to a solo project (Sommerville, 2015). Something more stripped down was needed. Iterative development offered the same core idea (build a bit, test it, adjust) without the team structures. The developer here is both implementer and evaluator, so a loose iterative loop was sufficient. No scrums, no planning meetings; just repeated cycles of design, implementation, testing, and refinement.

3.2.3 Final Selection and Customisation

The project uses an iterative development methodology (Sommerville, 2015). Work proceeds in phases, with each phase focused on a specific component or feature. A phase is done when the component works and has been tested manually. There are no formal sprints or scrums. Instead, development moved through self directed iterations: implement, test, reflect, and improve based on what was observed. That structure kept the system moving forward while leaving room to change direction when something did not work or when a better approach became clear. The goal was to stay aligned with the project objectives without the overhead of a full Agile setup.

3.3 Tools, Technologies, and Frameworks

The technology stack was chosen for compatibility and simplicity. Each component is described below.

The browser environment used for development and testing was Google Chrome (Chromium based). Chrome was used because of its widespread adoption and good support for the web APIs needed for event capture.

The client side is a simulated phishing page built with HTML and JavaScript, not a browser extension. The page runs in the browser and captures user interactions (clicks, keypresses, scroll depth, timing) as they occur. Events are sent to the backend over HTTP.

The backend is implemented with Spring Boot. Spring Boot was used to implement RESTful APIs for event collection and analysis. It receives events from the client, stores them, and computes risk scores when requested.

Java handles the server logic; JavaScript handles event capture in the browser. No other languages were used.

For storage, H2 was chosen. H2 is an embedded database that can run in memory or persist to a file. It stores runtime events and behavioural metrics without requiring a separate database server.

Risk scoring uses rule based heuristics only. Time to first interaction, scroll depth, and input activity are the main factors. No machine learning libraries (such as Scikit learn or TensorFlow) were used in the current implementation. The design leaves room for ML based detection later if needed, but the prototype relies entirely on rules that can be explained to the user.

3.4 System Implementation Process

The system is built around four stages that correspond to the workflow described in Section 3.1. Each stage is outlined below.

3.4.1 Runtime Monitoring

Monitoring happens on a simulated phishing page presented in the browser. The page mimics a familiar search or login interface (e.g. a Google style new tab with shortcuts to Gmail, Outlook, and similar services). As the user interacts (clicks, types, scrolls), JavaScript captures events and sends them to the backend. There is no browser extension; everything runs in the page. The setup is designed to elicit the kind of interaction that phishing pages typically prompt: searching, clicking links, entering text. Monitoring occurs transparently during normal browsing and does not rely on static code inspection.

3.4.2 Event Collection

Events are sent to the Spring Boot backend as they occur. The backend receives them, stores them in H2, and aggregates them by session. That aggregation is what allows behaviour to be analysed as a pattern rather than a stream of isolated actions. Events are collected over short time windows so that the system can reason about sequences (e.g. how quickly the user acted after the page loaded, how much they scrolled before interacting with a form).

3.4.3 Behaviour Analysis

The backend takes the raw events and extracts features: how quickly the user acted, how much they scrolled, how many clicks and keypresses, and how long the session lasted. Rule based logic turns those into a risk score and a list of contributing factors. No ML models are used; the rules encode patterns associated with rushed or credential focused behaviour (for example, very fast first interaction combined with low scroll depth and high input activity). The output is interpretable: users can see which factors contributed to the score and why a session was flagged.

3.4.4 Risk Reporting

The backend produces a risk score and a short list of contributing factors. The dashboard displays this with simple labels (e.g. Normal, Moderate risk, Suspicious) and colour coding. Risk levels map to low, medium, or high severity. The emphasis is on clarity: users should understand not just that something was flagged but why, so they can act on the information.

3.5 Data Collection and Preparation

Data comes from controlled use of the simulated phishing page. Users interact with the page in a sandboxed browser; no real credentials are involved. Benign behaviour is recorded during normal browsing sessions. The simulated page is designed to mimic phishing related actions (searching, clicking links, entering text) without exposing users to real threats.

Data preprocessing includes event filtering, time window aggregation, and feature normalisation. Event filtering removes noise and ensures only relevant interactions are kept. Time window aggregation groups events by session so that behavioural patterns can be computed. Feature normalisation keeps values consistent across sessions and improves the reliability of the analysis. All data is synthetic or anonymised. No personal or sensitive data is collected.

3.6 Ethical Considerations

The project does not involve human participants in a formal study sense. All activity takes place on a simulated page in a controlled environment. No real credentials are at risk and no personally identifiable information is processed or stored. The simulated page does not collect passwords or other sensitive input.

Software is built from open source components (Spring Boot, H2, and standard web APIs) under their respective licences. An ethics application was completed and categorised as No Ethics Required (NER) in accordance with university guidelines. Supporting documentation is provided in the appendix.

3.7 Implementation Practices and Development Process

This section describes how development was carried out in practice: the planning that preceded coding, how testing was integrated into the process, and what kinds of testing were used. The aim is to be transparent about how the system was built and validated.

3.7.1 Pre Implementation Planning and Prototyping

Design work came before coding. The architecture was informed by the requirements from Chapter 2: event capture on a simulated phishing page, postsession behavioural analysis, and a dashboard for risk communication. No formal wireframes or paper prototypes were produced. Development proceeded directly from these requirements. The architecture was refined iteratively as implementation progressed; some decisions (for example, which events to capture and how to structure the API) were finalised only when the code was written.

3.7.2 Development and Testing Integration

Testing was not left until the end. Code was not written from start to finish without intermediate validation. After each major component was built (the phishing simulation interface, event capture logic, backend integration, risk scoring, and dashboard), it was tested manually before moving on. That caught problems early and kept each piece working before integration. The idea was to avoid discovering that a component did not work only when everything was connected.

3.7.3 Testing Approach and Methods

Validation relied on manual black box testing. The system was tested from the outside: interact with the page (click, type, scroll), check that events reach the backend, that risk scores appear when the dashboard is opened, and that the dashboard shows sensible classifications and contributing factors. No automated unit tests or frameworks (such as Jest or Vitest) were used. For a prototype where the main goal is to demonstrate feasibility and correct end to end behaviour, rather than to achieve comprehensive test coverage, manual testing was judged adequate.

3.7.4 Methodology Awareness During Implementation

Development was intentionally phased. First the phishing simulation and event capture logic; then backend integration for receiving and storing events; then risk scoring and heuristic logic; and finally the dashboard for risk communication. Each phase was completed and tested before the next began. That kept the work manageable and allowed adjustments as the system took shape. When something did not work as expected, it could be fixed before moving on.

3.8 Chapter Summary

This chapter set out the methodology for PhishShield AI. An iterative development approach was chosen over Waterfall, Spiral, Lean, and Agile because it supported changing requirements and solo work without team ceremonies. The tools (Chrome, HTML/JavaScript for the simulated page, Spring Boot, H2, rule based heuristics) and the four stage process (monitoring, collection, analysis, reporting) were described. Data collection, preprocessing, and ethical considerations were also covered, along with how testing was integrated during development. The next chapters present the design and implementation in detail.
