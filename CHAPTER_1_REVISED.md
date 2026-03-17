# Chapter 1: Introduction

Phishing has become a leading cause of credential theft, with browsers acting as the main delivery point for attacks. Awareness campaigns and technical controls help, but many users still fall victim to schemes that mimic trusted sites such as search engines, email providers, and cloud storage. The question this dissertation tackles is whether behavioural monitoring of user interactions on phishing style pages can improve detection of phishing exposure compared to static preload analysis alone.

There is a gap in the literature regarding what happens during a user session on a phishing like page. How quickly do users react? How much do they scroll? Do they type credentials without reading? Most antiphishing tools focus on static signals: URL analysis, certificates, and content similarity to known phishing pages. These methods operate before or at page load but offer limited insight into behaviour once a user is on the page. A user may click rapidly, type without scrolling, or perform many actions in a short time; such patterns can suggest they are entering credentials. Static analysis cannot capture this.

This dissertation designs and implements PhishShield AI, a prototype system that simulates phishing like web pages, captures user behaviour during browsing (clicks, keypresses, scroll depth, timing), and analyses that behaviour to produce a risk score. The work tests whether lightweight postsession behavioural analysis can provide meaningful risk indicators that static inspection misses. It also examines how interaction patterns may signal phishing victimisation and whether real time behavioural monitoring is feasible for detection and user awareness.

## 1.1 Rationale

This work matters because it offers a new perspective on phishing detection. Phishing succeeds partly because users trust familiar interfaces—search bars, login forms, navigation patterns—without verifying authenticity. Simulators used in training and research typically record only outcomes: whether a user clicked a link or entered credentials. Few examine the process of interaction. This study looks at behavioural signals that might distinguish cautious users from those who are rushed or deceived.

The aim is to evaluate whether capturing in session behaviour, analysing it for risk, and presenting clear feedback can support more effective phishing detection. PhishShield AI bridges static preload checks and behavioural observation, investigating whether watching interaction in real time can improve detection and awareness.

## 1.2 Research Question

Can a lightweight behaviour based monitoring system detect phishing relevant interaction patterns more effectively than static preload analysis alone?

## 1.3 Aim

The aim is to design and build a lightweight system that simulates phishing like pages, captures user interaction behaviour in real time, and uses behavioural analysis to produce a risk score indicating potential phishing exposure.

## 1.4 Objectives

The work pursues six objectives:

1. Conduct a review of phishing techniques, user interaction research, and behavioural indicators that correlate with phishing victimisation.
2. Design a system capable of capturing runtime browser activity, including clicks, keypresses, scroll depth, and timing metrics.
3. Implement a functional prototype consisting of:
   - A simulated phishing environment (browser style interface mimicking search and login flows),
   - A backend service for event storage and analysis,
   - A postsession risk scoring engine based on heuristics (e.g. very fast first interaction, low scroll depth with input activity, high action rate),
   - A dashboard for viewing session data, risk scores, and contributing factors.
4. Test the system using realistic interaction scenarios to assess accuracy, false positive rate, and detection latency.
5. Evaluate the usability of risk outputs and visual feedback.
6. Document limitations and propose future improvements for real world deployment.

## 1.5 Project Approach

The project follows an iterative development methodology. Key stages include:

- **Research and requirement analysis:** Defining behavioural indicators of phishing relevant interaction (e.g. speed of first action, scroll depth vs. input activity).
- **System design:** Modelling architecture for event capture (frontend), storage and analysis (backend), and risk output (dashboard).
- **Implementation:** Building a simulated phishing page (HTML/JavaScript), a Spring Boot backend for event persistence and analysis, and a dashboard for session and risk visualisation. Risk scoring uses heuristics; machine learning may be integrated in future work.
- **Testing and evaluation:** Simulating user behaviour patterns, measuring detection performance, and assessing usability of risk feedback.

## 1.6 Ethics

The project does not involve human participants or personal user data. Testing is performed using synthetic interaction data and self created simulated scenarios within a controlled environment. The system is intended for research, training, and proof of concept purposes. Under institutional guidance it is categorised as No Ethics Required (NER); consultation with the ethics committee has been completed where required.

## 1.7 Summary

This chapter introduced the research context and defined the problem of limited behavioural visibility into user interactions on phishing like pages. It outlined the project aim, objectives, and development approach for PhishShield AI. The next chapter examines relevant academic literature and technological background informing the design.
