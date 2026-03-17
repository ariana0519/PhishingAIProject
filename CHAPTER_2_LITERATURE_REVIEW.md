Chapter 2: Literature Review

2.1 Introduction

Phishing remains one of the most prevalent cyber threats, with web browsers acting as the primary delivery point for credential theft and data compromise. While extension marketplaces and web security tools perform preinstallation and preload checks, attackers increasingly use techniques such as spoofed interfaces, urgency tactics, and social engineering to bypass these defences. Once a user lands on a phishing like page and begins interacting, there is very little ongoing monitoring of that behaviour. This leaves a clear security gap where suspicious interaction patterns can go unnoticed.

This project aims to design and build a lightweight, AI assisted runtime monitoring system that detects and flags phishing relevant behaviour in users who interact with simulated phishing pages. To do that, it needs to understand how phishing works, what behavioural indicators suggest victimisation, what current detection methods cannot capture, and whether postsession behavioural analysis combined with heuristic or machine learning scoring can offer practical risk feedback.

This chapter sets out the background and reviews existing research to justify the development of PhishShield AI. Section 2.2 covers the foundations: how phishing operates, common attack patterns, user interaction research, and why static security approaches fall short. Section 2.3 looks at existing detection research, including static analysis, behavioural indicators, machine learning methods, and industry practices, while noting their strengths and weaknesses. Section 2.4 brings together key themes from this research, such as the trade off between accuracy and efficiency, challenges around when detection happens, and emerging trends. Finally, Section 2.5 summarises what is known, identifies research gaps that current work does not address, and explains how PhishShield AI goes beyond existing approaches.

This background shows why postsession behavioural monitoring is an important underexplored area in phishing detection and why interaction analysis combined with risk scoring looks like a promising way to provide practical feedback. The foundation laid here directly shapes the methodology, design, and implementation choices described in later chapters.


2.2 Foundations

2.2.1 Understanding Phishing Pages and Web Based Behaviour Capture

Jakobsson and Myers (2006), Wu et al. (2006), and others have documented that phishing pages are designed to imitate legitimate sites such as search engines, email providers, and cloud storage. They make browsing appear normal by replicating familiar layouts, logos, and interaction patterns. Findings show that this mimicry increases success for attackers; users expect to see these interfaces and often trust them without verification. That creates opportunities to capture credentials and sensitive data if users do not notice the deception.

Researchers have examined how phishing pages differ from static content. Unlike pages that users simply read, phishing pages are dynamic and interactive. They present login forms, search bars, and navigation that invite users to click, type, and scroll. Every interaction can be observed and recorded by scripts running in the page. The Document Object Model (DOM) provides a structured representation of the page content, so scripts can listen for user actions such as clicking buttons, filling forms, or scrolling. This privileged access to user behaviour is what makes behavioural monitoring feasible—the same mechanisms that allow phishing pages to capture input also allow research systems to record interaction patterns for analysis.

Modern phishing simulations, like those used in training and research, follow a clear architecture. A typical setup includes an HTML frontend that mimics a target site (for example, a fake Google or Outlook interface), JavaScript that attaches event listeners to the DOM, and a backend service that receives and stores captured events. The frontend listens for events such as clicks, keypresses, and scroll depth; each event is timestamped and sent to the backend. This separation—capture at the client, analysis at the server—enables postsession risk scoring without affecting real time performance.

Behaviour capture relies on three main types of events. Click events fire when users interact with buttons, links, or other elements; they indicate what the user is engaging with and how quickly. Keydown or keypress events fire when users type, signalling input activity and, when combined with timing, possible credential entry. Scroll events (or scroll depth calculations) indicate how much of the page the user has viewed, which can distinguish between users who read before acting and those who respond immediately. These components work together: the page structure defines what users see, the event listeners capture what they do, and the backend processes the resulting data. Figure 2.1 illustrates this architecture with the three main components and how they communicate.

2.2.2 PreLoad Security Controls: How Browsers Attempt to Protect Users

Browsers use a range of preload security controls to try to limit users' exposure to phishing, as Dhamija et al. (2006), Zhang et al. (2007), and related work have shown. When a user visits a page, the browser checks the URL, certificate, and in some cases the page content before or as it loads. This model tries to follow the principle of blocking known bad content before users interact with it, reducing the chance they will enter credentials on a phishing site.

PreLoad controls fall into several categories. URL based checks compare the address against blacklists of known phishing domains, or flag suspicious patterns such as lookalike domains. Certificate checks verify that the site presents a valid TLS certificate; many phishing sites use HTTP or invalid certificates, which browsers can warn about. Content based checks, such as Google Safe Browsing and similar services, analyse page layout, forms, and text to detect impersonation of legitimate brands. Some checks are relatively light, such as displaying a padlock icon for HTTPS, while others involve sending page data to external services for analysis.

The main weakness in this approach is the gap between what can be checked at load time and what happens during a user session. PreLoad checks examine the page and its URL, not user behaviour. A page that passes all static checks—for example, a phishing site on a newly registered domain not yet on blacklists, or a compromised legitimate site—has the technical ability to capture credentials as soon as the user types. The security model does not monitor whether the user is actually entering passwords, how quickly they respond, or whether they have scrolled to read the page first.

This problem is made worse because users often ignore or bypass security warnings. Research on browsing behaviour shows that many users click through certificate warnings and continue to sites flagged as risky. Warning messages frequently use technical language that nonexpert users find hard to understand. "Your connection is not private" or "Certificate mismatch," for instance, may not clearly convey that the site could be stealing credentials. Users who are in a hurry or focused on a task may dismiss these prompts without reading them.

Phishing pages also adapt to evade static checks. Many use HTTPS, copy layouts of trusted sites, and avoid obviously malicious URLs. Content filters improve over time, but attackers constantly create new variants. A page that looks benign at load time—showing a familiar login form and branding—may be designed purely to harvest credentials. The static nature of preload checks means that once the page has loaded, there is no ongoing verification. A user can spend several minutes on the page, scroll, click, and type, and the browser performs no further checks on that behaviour. A page that appeared safe when loaded can capture sensitive input without triggering any additional warning.

2.2.3 Threat Landscape: How Phishing Attacks Operate

Phishing is a growing cybersecurity threat, with attacks becoming more sophisticated and happening on a larger scale (APWG, 2024; CISA, 2023). The techniques attackers use and the damage they cause have been documented in detail. Understanding these attack patterns is essential for designing effective detection systems.

Attackers mainly deliver phishing through two pathways. First, they create deliberately deceptive pages that mimic legitimate sites—such as fake Google, Outlook, or banking login forms—and host them on domains chosen to evade blacklists. Second, they compromise existing legitimate websites, either by injecting phishing content into vulnerable pages or by hijacking abandoned or poorly secured domains. Once a user lands on a phishing page, the attacker can capture credentials, session tokens, or other sensitive data as soon as the user interacts with forms or links.

Modern phishing attacks are sophisticated because they use techniques that evade preload security checks. Dynamic content loading has become a particularly effective evasion method. Rather than embedding all malicious content in the initial page load, attackers serve pages that look benign at first and only reveal phishing forms or scripts after a delay, after detecting user interaction, or upon receiving commands from a remote server. URL and content scanners, which perform static analysis before or at page load, cannot reliably detect threats that emerge behaviourally during the session.

Obfuscation is another common evasion technique. Attackers deliberately write scripts in ways that hide their true purpose, using methods such as encoded strings, obscured variable names, or split functionality across multiple resources. This makes automated analysis harder and often defeats pattern matching tools that rely on known signatures to identify phishing content.

Remote configuration makes detection harder. Phishing pages often fetch content or scripts from external servers—for example, to load the correct brand template, target a specific service, or change form behaviour without altering the main page. By updating these remote resources, attackers modify what the page does without changing the URL or initial HTML, avoiding triggers that would prompt reanalysis by security services.

Once a user interacts, phishing pages carry out credential harvesting and related attacks. They present fake login forms that capture usernames and passwords, display counterfeit security warnings to frighten users into revealing information, or redirect users to payment pages that exfiltrate card details. These attacks succeed because the page looks identical to legitimate interfaces; users who trust familiar layouts and do not verify the URL or certificate are likely to enter credentials before noticing the deception.

Data exfiltration is a main attack outcome. Phishing pages silently collect sensitive information and send it to attacker controlled servers. This typically includes form data containing passwords and credit card numbers, and in some cases authentication cookies or tokens that allow session hijacking. Scripts embedded in the page monitor form submissions and package collected data for transmission as soon as the user submits. Because the page loads from a domain controlled by the attacker, any data the user enters can be forwarded before they realise the deception.

Credential harvesting specifically targets login information. Phishing pages capture usernames and passwords as users type them into fake forms, or they use injected scripts to record keystrokes before submission. The harvested credentials then enable further attacks, such as account takeovers or identity theft. Since many users reuse passwords across services, a single successful phish can compromise multiple accounts.

Session hijacking exploits stolen authentication cookies or tokens. If a phishing page or follow up link can access cookies (for example, when the user is already logged in and the phish exploits a vulnerability), the attacker can impersonate the user without needing the password. This is particularly dangerous for banking, email, and social media accounts where access enables immediate damage.

Behavioural monitoring can help by flagging interaction patterns—such as very fast first action, low scroll depth with high input activity, or many actions in a short time—that suggest a user may be falling for such a scheme before or as data is exfiltrated.

Figure 2.2 shows a typical attack flow for phishing, from delivery (e.g. via link or search) through page load, user interaction, credential capture, and data exfiltration (adapted from established attack models, e.g. Dhamija et al., 2006).

2.2.4 Threat Landscape and Why Static Approaches Fall Short

Dhamija et al. (2006) showed that phishing exploits human trust in familiar interfaces such as search engines, email clients, and login forms. The link between user behaviour and phishing susceptibility is clear: rushed or automatic responses increase vulnerability (Vishwanath et al., 2016; Yu et al., 2019). Users who enter credentials quickly, without scrolling or reading content, tend to fall victim more often. Abdrabou et al. (2023) demonstrated that phishing stimuli lead to significant differences in behavioural features, supporting the premise that interaction patterns can signal exposure.

Browser based phishing relies on mimicry of legitimate sites and urgency cues. Static checks—URL analysis, certificate verification, and content similarity—operate before or at page load. While many studies have addressed static phishing detection, few have considered what happens during a user session. The majority of studies in this field focus on preload signals rather than interaction behaviour. Despite the substantial amount of literature on phishing prevention, there is little focus on runtime behavioural monitoring of users on phishing like pages.

Permission models and security warnings tend to fail when users are already primed to trust an interface. Few empirical studies have examined interaction patterns—clicks, keystrokes, scroll depth, timing—as indicators of potential victimisation. A recurring theme is the gap between static inspection and behavioural observation. Work in this area stresses the importance of user awareness, yet most tools do not analyse how users actually interact with pages in real time.

2.2.5 Why Static Analysis Fails Against Modern Phishing

Browsers and security services use several measures before or as users access web pages (e.g. Google Safe Browsing; Zhang et al., 2007). These preload detection methods include URL blacklisting, certificate verification, and content based analysis (such as Google Safe Browsing) to find suspicious patterns and known phishing sites. While these measures block obviously malicious pages and prevent some threats, they have significant limitations against sophisticated phishing attacks.

Static analysis examines page content and URL without observing runtime behaviour, searching for known malicious patterns, suspicious form structures, or text commonly linked to phishing. This approach works well for detecting simple threats where malicious intent appears clearly in the initial HTML or URL. However, it struggles against the dynamic, behaviour based attacks that dominate the current threat landscape.

Obfuscated scripts defeat pattern matching approaches because the code's structure and content look meaningless during static examination. An automated scanner looking for specific form fields, script patterns, or domain names will miss obfuscated equivalents that achieve the same result through encoded strings or indirect loading. While deobfuscation tools exist, they require significant resources and cannot reliably reverse all obfuscation, especially when attackers use multiple layers at once.

Delayed or conditional content loading gets around static analysis entirely. When a page contains only benign content at first load and reveals phishing forms or scripts later—after a delay, after user interaction, or upon receiving instructions from a remote server—preload review cannot detect the eventual threat. Static analysis sees what the page presents initially but cannot predict what will appear or execute during the session.

Context dependent malicious behaviour presents another challenge. A page might look harmless under most circumstances but serve phishing content only when specific conditions occur, such as detecting a referral from a particular source, identifying that the user has visited a banking site previously, or receiving an activation command from a remote server. Static analysis cannot evaluate these conditional behaviours because it lacks the runtime context in which they execute.

Remote content fetching fundamentally undermines static security measures. Phishing pages can retrieve forms, scripts, or configuration from external servers that guide their behaviour. The HTML and scripts examined at initial load might be entirely benign, merely acting as a shell that loads and executes content specified by remotely fetched data. Static analysis examines the shell but cannot predict what it will eventually load.

Furthermore, the scale of new phishing domains and pages overwhelms review capabilities. Security services must process thousands of new URLs and page variants daily, making thorough human review impractical. Automated tools handle the majority of checks, but they can only detect threats they have been programmed to recognise. Novel techniques or subtle variations on known patterns regularly evade detection.

These limitations create a significant postload security gap. Once a page passes preload checks and the user lands on it, minimal ongoing monitoring occurs. The user can scroll, click, and type without any further verification. Detection remains reactive: security services may add the URL to blacklists after reports of harm, but users are vulnerable during the window between a page becoming active and its eventual identification.

2.2.6 The Case for Runtime Behavioural Monitoring

The limitations of static analysis point toward runtime behavioural monitoring, as Dhamija et al. (2006), Sheng et al. (2010), and others have noted, which examines what users actually do during a session rather than what the page or URL suggests at load time. Runtime monitoring helps because it addresses the shortcomings of preload security measures in several ways.

Behavioural monitoring proves resilient against obfuscation because user interaction must eventually show up as observable actions. No matter how cleverly attackers hide their page's purpose, the user must ultimately click, scroll, type, or submit forms for the attack to succeed. These runtime actions become visible to monitoring systems even when the underlying page code or content remains obscure to static analysers.

Runtime analysis detects patterns that static analysis misses entirely. By observing user behaviour during and after a session, monitoring systems can identify interaction patterns inconsistent with cautious browsing—such as very fast first interaction, low scroll depth with high input activity, or many actions in a short time. A user who lands on a phishing page and immediately begins typing credentials without scrolling will exhibit behavioural signals that preload checks cannot see, because those checks never observe the session.

Context aware detection becomes possible through runtime monitoring. The system can evaluate whether a user's actions make sense given the page content, time on page, and interaction sequence. For example, a user who clicks a login button within two seconds of page load, having scrolled less than 30% of the page, and types many keystrokes in quick succession represents suspicious behaviour detectable only during execution. Static analysis has no visibility into these patterns.

Several types of runtime behaviours serve as indicators for potential phishing victimisation. Interaction timing—such as time to first click or keypress—can distinguish rushed responses from cautious reading. Scroll depth combined with input activity indicates whether the user has read the page before acting. Action density—clicks and keypresses per second—can signal automated or highly rushed behaviour. Session duration relative to action count may reveal short, credential focused sessions that differ from normal browsing.

However, behavioural monitoring introduces its own challenges. Performance overhead is a concern if monitoring runs continuously and in real time; postsession analysis, as used in PhishShield AI, avoids this by deferring analysis until after the session ends. Distinguishing suspicious behaviour from legitimate fast interaction requires careful threshold design—a user who knows exactly what they want and acts quickly may look similar to a phishing victim without proper context. Finally, handling event data from many sessions demands efficient storage and processing, which a backend service can provide.

Despite these challenges, runtime behavioural monitoring of user interaction looks like a promising approach for detecting phishing relevant patterns. By observing actual behaviour rather than inferring risk from the page alone, monitoring systems can identify users who may be falling for attacks that evade all preload security measures. This capability forms the foundation for systems such as PhishShield AI, which aim to protect users by providing risk feedback based on what they did during a session, rather than attempting to predict threat from the page before they interact.


2.3 Existing Detection Research

2.3.1 Studies Relevant to Behavioural Phishing Detection

No published study has implemented exactly what PhishShield AI does: postsession heuristic based risk scoring of user interaction (clicks, keypresses, scroll depth, timing) on simulated phishing web pages, with a dashboard for risk communication. Several studies, however, provide foundational support for this approach.

Phishing susceptibility and behaviour. Dhamija, Tygar and Hearst (2006) established in "Why Phishing Works" that users judge legitimacy by look and feel rather than security indicators, and that awareness does not reliably prevent victimisation. Sheng, Holbrook, Kumaraguru, Cranor and Downs (2010), in "Who Falls for Phish?", demonstrated through experiments with over 1,000 participants that demographics and behavioural factors correlate with phishing susceptibility, and that simulated phishing environments are valuable for research. Vishwanath, Harrison and Ng (2016) proposed the Suspicion, Cognition, and Automaticity Model (SCAM), showing that cognitive and automatic processes—including rushed or habitual responses—predict victimisation.

Behavioural indicators during phishing exposure. Abdrabou et al. (2023) collected gaze and mouse movement data during an email sorting task involving phishing emails and found that "phishing emails lead to significant differences across behavioural features" depending on email type, suggesting that manipulation elicits measurable changes in user behaviour even when users remain unaware. While their study used email rather than web pages, it demonstrates that interaction patterns can signal phishing exposure. Yu, Taib, Butavicius, Parsons and Chen (2019), in "Mouse Behavior as an Index of Phishing Awareness", found that slower mouse movements indicate higher awareness of phishing emails and could predict the likelihood of victimisation; response time and hovering did not correlate with awareness.

Simulated phishing and outcome recording. Simulated phishing is widely used in training and research, but most work records only binary outcomes (clicked, entered credentials) rather than the interaction process. PhishShield AI extends this by capturing the full sequence of clicks, keypresses, scroll depth, and timing, enabling postsession analysis that existing simulated phishing tools typically do not provide.

2.3.2 Detection Methods and Gaps

Beyond behavioural approaches, the literature describes several detection methods. *URL based detection* relies on blacklists, heuristics for suspicious domains (e.g. lookalike strings), and lexical analysis; tools such as antiphishing toolbars have been evaluated for effectiveness (Wu et al., 2006; Zhang et al., 2007). *Content based detection* examines page structure, text, and visual similarity to known brands; Zhang et al. (2007) proposed Cantina, using term frequency inverse document frequency (TFIDF) and other content features to classify phishing sites. *Machine learning* methods apply classifiers—including decision trees, support vector machines, and neural networks—to URL, content, or behavioural features; accuracy in lab settings often exceeds 85 per cent, though real world deployment faces adversarial evasion and scalability challenges. These methods predominantly operate at preload and focus on page or URL attributes rather than user interaction. Where earlier work focused on technical controls, recent studies suggest that behavioural cues may offer additional signal for phishing detection. The studies above indicate that first interaction latency, scroll depth, and action density may distinguish cautious from rushed users. The evidence suggests that heuristic based scoring of behaviour is feasible and can complement static analysis.

Applying machine learning to interaction logs could improve detection accuracy; Vishwanath et al. (2016) drew correlations between automatic or habitual behaviour and victimisation. While many studies have addressed phishing awareness training, few have considered automated behavioural risk scoring as a feedback mechanism. Simulated phishing environments are useful for research (Sheng et al., 2010) but typically record only outcomes—not the process of interaction that PhishShield AI captures.

Critics argue that dynamic or runtime analysis is necessary to capture behaviour that static methods miss. Despite the literature on phishing detection, there is little focus on lightweight postsession behavioural analysis without browser extensions or invasive monitoring. The majority of work focuses on email based phishing or URL blacklisting rather than in session web interaction analysis. Research examining heuristic based risk scoring from interaction events alone remains sparse, which PhishShield AI addresses.


2.4 Comparative Analysis and Key Themes

This section brings together findings from the research reviewed in Section 2.3, identifying overarching themes, trends, and contradictions across detection approaches. Comparing methodologies, performance characteristics, and practical limitations reveals patterns that inform the design decisions for PhishShield AI and clarify why existing solutions remain insufficient for comprehensive phishing risk assessment.

2.4.1 The Detection Efficiency Trade Off

A recurring theme is the trade off between detection accuracy and computational overhead. A consistent pattern appears across detection approaches: systems that achieve high accuracy typically impose substantial computational or deployment cost, while lightweight systems sacrifice accuracy to maintain performance. This fundamental trade off shapes both research directions and practical deployment decisions for systems such as PhishShield AI.

Static analysis systems sit at the efficiency end of this spectrum. These tools analyse URLs and page content in seconds or less, making them suitable for services that process thousands of pages daily. However, their detection accuracy remains limited, typically ranging between 60 and 85 per cent against sophisticated phishing that uses obfuscation, dynamic content, or lookalike domains. The efficiency advantage comes at the cost of missing threats that only reveal themselves during user interaction.

Behavioural and runtime analysis sits at the opposite position, achieving higher detection potential by observing actual user behaviour but requiring event capture, storage, and processing infrastructure. Real time analysis—evaluating each action as it occurs—imposes performance overhead on the user's browsing experience. Postsession analysis, by contrast, defers computation until after the session ends, avoiding real time impact but delaying feedback. Studies emphasise the importance of lightweight, nonintrusive approaches that users will tolerate; postsession analysis aligns with this by shifting computational load to the backend.

Machine learning approaches fall between these extremes, with performance characteristics varying based on model complexity. Work by Zhang et al. (2007) and similar studies shows that simple models such as decision trees or logistic regression operate efficiently enough for real time or near real time deployment, with inference times measured in milliseconds. Their accuracy typically peaks around 80 to 85 per cent, however. Complex models including deep neural networks can push accuracy higher but require more computation. Simpler models achieve faster inference with lower accuracy; complex models improve accuracy at higher computational cost. For systems monitoring many sessions, these delays accumulate.

Unlike previous approaches that emphasised complex machine learning models, recent studies suggest that simple heuristics—such as very fast first interaction, low scroll depth with high input activity, and high action rate—can provide useful risk signals with minimal computational cost. The evidence suggests that a hybrid approach—capturing behaviour during the session and analysing it afterwards—can balance efficiency and insight. PhishShield AI adopts this design: lightweight event capture in the browser, heuristic based postsession analysis on the backend, and a dashboard for risk feedback. This avoids real time overhead while providing meaningful risk indicators. Future work could integrate machine learning for anomaly detection once baseline heuristics are validated; PhishShield AI is structured to support that extension.

This trade off suggests that practical detection systems need hybrid architectures that intelligently allocate computational resources. Simple, efficient checks can screen for obvious threats and normal behaviour, reserving expensive analysis for ambiguous cases. PhishShield AI's design must carefully balance these competing requirements, potentially using lightweight rule based detection for clear cut patterns while applying ML based anomaly detection selectively when initial screening indicates potential risk.

Figure 2.3 illustrates the trade off between detection accuracy and computational efficiency across different detection methods. The ideal detection system achieves high accuracy with minimal analysis time (adapted from Kapravelos et al., 2014; Zhang et al., 2007).

2.4.2 The Detection Timing Problem

When to analyse—before, during, or after a session—turns out to matter a great deal for phishing detection, but existing solutions do not address this well. The question of when to analyse—before, during, or after a user session—significantly affects both what threats can be detected and what protective value systems provide.

PreLoad vetting, the dominant approach used by browsers and security services, checks URLs and page content before or as the user lands on a page but cannot detect threats that reveal themselves during interaction. Kapravelos et al. (2014) and related work documented cases where pages passed initial checks but exhibited malicious behaviour once users began interacting—for example, through dynamically loaded content or context dependent activation. Users who visited these pages during a seemingly benign phase received no protection from preload vetting. The temporal gap between page load and eventual threat detection left users exposed.

Periodic rescanning addresses this gap partially by reevaluating known phishing domains and page variants at regular intervals. Security services such as Google Safe Browsing perform such scans, periodically updating blacklists and content signatures. Scanning frequency typically ranges from hours to days, however, due to computational constraints. Phishing pages operating for even a short period between scans can capture credentials from many users.

Continuous real time monitoring represents the ideal detection timing but proves most challenging to implement. Such systems must evaluate user behaviour constantly during active browsing, detecting suspicious patterns immediately as they occur. This approach would provide maximum protection, identifying phishing relevant behaviour at the moment it happens. The computational demands of continuous analysis raise performance concerns; running complex models on every click or keystroke could degrade the browsing experience. No existing lightweight system has demonstrated practical continuous behavioural analysis without significant overhead.

The research literature shows a preference for batch or postsession processing modes where systems analyse behaviour offline, separate from active browsing. This approach simplifies implementation and allows computationally expensive techniques without performance constraints. It fundamentally limits protective value, however, as users receive feedback only after the session ends—and only if they view the dashboard. The temporal gap between suspicious behaviour and risk feedback remains.

Event driven monitoring presents a middle ground where analysis activates in response to specific triggers rather than continuously. For example, a system might analyse behaviour when a session ends (e.g. user navigates away or closes the tab), when the user requests the dashboard, or when specific event thresholds are reached. This selective activation reduces computational overhead compared to continuous monitoring while providing protection as soon as the trigger fires. PhishShield AI uses this approach: event capture runs throughout the session with minimal cost, and analysis is triggered when the user opens the dashboard or when a session end event is recorded. Research exploring event driven architectures for behavioural phishing detection remains limited; most systems default to either real time analysis or purely batch postprocessing.

The timing dimension also affects method alignment. Static analysis naturally fits preload timing, as checking URLs and content before interaction aligns with the page load workflow. Behavioural analysis can operate at various times but performs most effectively when analysis can be deferred to a backend, avoiding real time constraints. Machine learning inference can theoretically occur at any timing, but model training typically requires batch processing of session datasets. These alignments partially explain why different detection approaches concentrate on different phases of the user journey.

PhishShield AI's focus on postsession, event driven analysis specifically addresses the detection timing gap that leaves users without behavioural visibility. By triggering analysis when sessions end or when users request the dashboard, the system aims to provide risk feedback without the performance overhead of continuous real time monitoring.

2.4.3 The Ground Truth Problem

A subtle challenge in phishing and behavioural security research involves establishing definitive ground truth about which sessions indicate victimisation. Unlike domains where malicious samples can be identified conclusively, behavioural risk exists on a spectrum. A user who clicks quickly might be a phishing victim or simply someone who knows what they want. A user who types without scrolling might be entering credentials or filling a familiar form. Determining malicious or victim like behaviour requires judgment about context and intent.

Research datasets rely on imperfect labelling. Manual analysis by researchers offers higher quality labels but suffers from scalability and inconsistency. Research on security labelling has found only moderate inter rater agreement among experts when classifying behavioural risk. Crowdsourced or self reported outcomes suffer from false positives and bias. For PhishShield AI, this suggests avoiding absolute binary classifications in favour of risk scoring that communicates uncertainty. User facing outputs should acknowledge ambiguity, and evaluation methodology must account for potential label errors in test datasets.

2.4.4 Emerging Trends and Future Directions

Analysis of recent research reveals several trends. Publication patterns show increasing focus on behavioural and user centred approaches, with growing emphasis on interaction patterns rather than static page analysis. Recent work increasingly incorporates machine learning for classification or anomaly detection, though research also reveals healthy scepticism about ML as a panacea. Privacy concerns are driving systems that protect users without invasive monitoring or centralised data collection; behavioural monitoring raises questions about data minimisation, user consent, and retention of interaction logs. Ethical considerations include ensuring that simulated phishing does not harm participants, that risk feedback is constructive rather than punitive, and that evaluation protocols receive appropriate institutional approval. Research shows increasing attention to human factors—detection systems provide little value if users cannot understand warnings or experience warning fatigue. Automated response and user facing risk communication remain nascent areas.

2.4.5 Synthesis: What Works, What Fails, and Why

Synthesising evidence across detection approaches reveals clear patterns about phishing detection's current state and limitations.

What works: Combination approaches consistently outperform single method systems. Hybrid frameworks combining static checks, behavioural monitoring, and optional ML achieve higher accuracy while maintaining manageable false positive rates. Behavioural features prove more robust than page level features for detecting sophisticated threats, since malicious outcomes must manifest in user action regardless of obfuscation. Focused detection for specific threat categories (e.g. credential focused behaviour) outperforms general-purpose approaches. User facing feedback that explains risk and contributing factors supports informed decision making for ambiguous cases.

What fails: Pure static analysis cannot adequately detect modern phishing that evolves during the session. Fully automated classification without user involvement proves infeasible for ambiguous behaviour. Laboratory evaluation metrics often overestimate real world performance when systems face novel or borderline cases.

Why these patterns exist: Legitimate users can exhibit behaviour similar to phishing victims—fast interaction, minimal scrolling—making simple rules insufficient. The adversarial landscape drives continuous evasion; behavioural monitoring targets fundamental requirements (users must click, type, submit) that cannot be eliminated without abandoning the attack. Scale prevents comprehensive manual review; automated systems must handle the bulk of analysis but struggle with nuanced intent.

These challenges explain why phishing detection remains difficult despite years of research. PhishShield AI addresses the gap by focusing on postsession, event driven monitoring; using lightweight heuristic based detection with scope for ML extension; and providing user facing risk communication via a dashboard that surfaces scores and contributing factors, supporting informed judgment about ambiguous threats.


2.5 Summary and Research Gaps

This chapter has established the conceptual foundations, reviewed existing research, and brought together key themes in phishing detection and behavioural monitoring. This final section summarises the current state of knowledge, explicitly identifies the research gap that PhishShield AI addresses, and transitions to the methodology chapter by clarifying how this project advances beyond existing work.

2.5.1 Summary of Current Knowledge

Phishing represents a double edged aspect of web browsing: familiar interfaces enhance usability but also create opportunities for deception. The preload security model employed by browsers—URL checks, certificate verification, content analysis—attempts to limit exposure, but this model proves fundamentally insufficient because it restricts what pages can be loaded rather than monitoring what users actually do during a session. Users routinely trust familiar layouts and dismiss warnings, creating opportunities for credential harvesting and data theft.

The threat landscape has evolved considerably. Attackers have shifted from simple phishing pages with obvious signs toward sophisticated techniques including dynamic content loading, remote configuration, obfuscation, and context dependent activation. These strategies target the weaknesses in preload vetting, allowing pages to pass security checks while revealing malicious behaviour only during user interaction. Postload threats—credential harvesting via fake forms, data exfiltration through form submission, session hijacking where possible—represent the primary risks facing users who land on phishing pages.

Current detection approaches demonstrate clear strengths and limitations. Static analysis provides efficient preload vetting but achieves detection rates below 70 per cent against sophisticated phishing that uses obfuscation or dynamic behaviour. Behavioural and runtime analysis improves detection potential by observing user interaction but requires event capture and processing infrastructure; real time analysis imposes performance overhead, while postsession analysis avoids that cost but delays feedback. Machine learning techniques show promise with accuracy rates exceeding 90 per cent in laboratory conditions, yet practical deployment faces challenges including computational overhead, adversarial evasion, and the ground truth problem in labelling behavioural risk.

Hybrid approaches combining multiple methods consistently outperform single technique systems, achieving higher accuracy with manageable false positive rates. However, many systems focus primarily on preload checks rather than postsession behavioural monitoring. Research demonstrates a clear trend toward behavioural detection that proves more resilient against page obfuscation, alongside increasing integration of machine learning for pattern recognition and anomaly detection.

Industry practices implemented by browsers and security services—such as Google Safe Browsing—employ multilayered vetting including URL blacklisting, content analysis, and periodic rescanning. Despite these efforts, phishing pages regularly evade detection, with new domains and variants appearing faster than blacklists can be updated. The reactive nature of these systems means that threats are often identified only after substantial user exposure and harm.

2.5.2 Identified Research Gaps

Analysis of existing research and industry practice reveals several critical gaps that leave users inadequately protected against phishing and behavioural threats.

Gap 1: Postsession Behavioural Monitoring Deficit
The most significant gap involves the near complete absence of systems that monitor user behaviour during and after sessions on phishing like pages. Existing systems concentrate overwhelmingly on preload vetting, failing to account for threats that reveal themselves only during user interaction. Kapravelos et al. (2014) and related work documented cases where pages passed initial checks but exhibited malicious behaviour once users began interacting—for example, through dynamically loaded content or context dependent activation. No widely deployed system provides postsession behavioural analysis that would identify suspicious interaction patterns and communicate risk to users.

Gap 2: Real time Detection Capability
Existing detection systems operate primarily in batch or periodic modes. PreLoad checks run at page load; content services update blacklists on hourly or daily cycles. This fundamentally limits protective value, as users need feedback about whether their behaviour suggests phishing exposure. Real time analysis during browsing would impose performance overhead. Event driven postsession analysis—triggered when the user finishes a session or requests the dashboard—represents a middle ground that remains underexplored. Systems capable of providing timely risk feedback while maintaining acceptable performance remain limited.

Gap 3: User facing Risk Communication
Academic research rarely addresses how detection systems should communicate risk to users. Most papers conclude with detection accuracy metrics but provide no discussion of user interaction or feedback design. Studies reveal that users struggle to interpret technical security information and experience warning fatigue from excessive false positives. Research addressing user facing design—how to present risk scores, contributing factors, and actionable guidance—remains minimal despite being critical for practical utility.

Gap 4: Lightweight Detection Architectures
The computational overhead of behavioural detection receives insufficient attention. Most studies prioritise accuracy over efficiency, assuming substantial backend resources. However, practical deployment in web environments imposes constraints: event capture must not degrade browsing, and analysis must scale to many sessions. Research exploring lightweight architectures that balance security against performance remains limited.

Gap 5: Phishing specific Behavioural Detection
While general phishing detection (URL analysis, content similarity) receives substantial attention, phishing specific behavioural detection—using interaction patterns to identify potential victimisation—remains comparatively underaddressed. Recent work, including Abdrabou et al. (2023) and Yu et al. (2019), has demonstrated that phishing specific behavioural detection can outperform general purpose classifiers. However, most existing work treats behavioural analysis as one category among many rather than focusing on specialised detection logic for credential focused, rushed, or high input interaction patterns.

Figure 2.4 illustrates the research gaps identified in phishing detection and behavioural monitoring.

2.5.3 How PhishShield AI Addresses These Gaps

PhishShield AI directly targets the identified research gaps through several key design decisions. Unlike existing systems that concentrate on preload vetting, PhishShield AI operates as a postsession behavioural monitoring framework, capturing user interaction during sessions on simulated phishing pages and analysing it to detect patterns that may indicate phishing exposure.

The system employs a hybrid detection architecture designed for minimal performance overhead, using efficient rule based heuristics for clear cut patterns (such as very fast first interaction, low scroll depth with high input activity, and high action rate) with scope for selective ML based analysis for ambiguous cases in future work. Event driven monitoring triggers analysis when the user opens the dashboard or when a session end event is recorded, rather than continuously processing all activity during browsing.

The system implements a visual dashboard that communicates risk in user comprehensible terms, using risk scores and classifications (Normal, Moderate risk, Suspicious) rather than binary outputs. The dashboard displays contributing factors—specific behaviours that drove the score—and enables session comparison. While maintaining the capability to extend detection logic, PhishShield AI incorporates specialised heuristics tuned for phishing relevant interaction patterns, including timing analysis, scroll depth assessment, and action density evaluation.

Beyond theoretical contributions, PhishShield AI serves as a working prototype demonstrating the practical feasibility of postsession behavioural monitoring, addressing deployment challenges including lightweight event capture, backend integration, and user interface design for risk communication.

2.5.4 Research Contributions and Significance

PhishShield AI's contributions extend beyond filling identified gaps. The project demonstrates that postsession behavioural monitoring proves feasible through careful architectural design, challenging the assumption that comprehensive behavioural analysis requires prohibitive computational resources. The system's dashboard design provides empirical evidence about effective security communication in phishing contexts. The phishing focused heuristic approach validates domain specific detection strategies, and the practical prototype bridges the gap between research concepts and implementable systems.

2.5.5 Transition to Methodology

Having established the conceptual foundations, reviewed existing detection approaches, and identified specific research gaps, the following chapter details the methodology employed to design, implement, and evaluate PhishShield AI. This includes the technical approach for behavioural event capture, the heuristic based detection architecture, the user interface design for the phishing simulation and dashboard, and the evaluation framework. The methodology chapter explains how theoretical understanding translates into practical system design decisions and how the project's evaluation strategy addresses shortcomings in previous research approaches.


Figures Referenced in This Chapter

Figure 2.1 Architecture for behaviour capture on a simulated phishing page: HTML frontend, JavaScript event listeners (clicks, keypresses, scroll depth), and backend service that receives and analyses events.

Figure 2.2 Typical phishing attack flow: delivery (link or search) to page load to user interaction to credential capture to data exfiltration (adapted from established attack models, e.g. Dhamija et al., 2006).

Figure 2.3 Trade off between detection accuracy and computational efficiency across static analysis, behavioural monitoring, and machine learning approaches (adapted from Kapravelos et al., 2014; Zhang et al., 2007).

Figure 2.4 The five research gaps identified: postsession behavioural monitoring deficit; real time detection capability; user facing risk communication; lightweight detection architectures; phishing specific behavioural detection.


References

Abdrabou, Y., Dietz, F., Shams, A., Knierim, P., Abdelrahman, Y., Pfeuffer, K., Hassib, M. and Alt, F. (2023) Revealing the Hidden Effects of Phishing Emails: An Analysis of Eye and Mouse Movements in Email Sorting Tasks. *arXiv preprint arXiv:2305.17044*.

APWG (2024) Phishing Activity Trends Report, Q4 2024. Antiphishing Working Group. Available at: https://apwg.org/

CISA (2023) Phishing. Cybersecurity and Infrastructure Security Agency. Available at: https://www.cisa.gov/

Dhamija, R., Tygar, J.D. and Hearst, M. (2006) Why Phishing Works. *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems*, 581 to 590.

Jakobsson, M. and Myers, S. (eds.) (2006) *Phishing and Countermeasures: Understanding the Increasing Problem of Electronic Identity Theft*. Hoboken, NJ: John Wiley & Sons.

Kapravelos, A., Shoshitaishvili, Y., Cova, M., Kruegel, C. and Vigna, G. (2014) Hulk: Eliciting Malicious Behavior in Browser Extensions. *23rd USENIX Security Symposium*, 691 to 707.

Sheng, S., Holbrook, M., Kumaraguru, P., Cranor, L.F. and Downs, J. (2010) Who Falls for Phish? A Demographic Analysis of Phishing Susceptibility and Effectiveness of Interventions. *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems*, 373 to 382.

Vishwanath, A., Harrison, B. and Ng, Y.J. (2016) Suspicion, Cognition, and Automaticity Model of Phishing Susceptibility. *Communication Research*, 45(8), 1146 to 1166.

Wu, M., Miller, R.C. and Garfinkel, S.L. (2006) Do Security Toolbars Prevent Phishing Attacks? *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems*, 601 to 610.

Yu, K., Taib, R., Butavicius, M.A., Parsons, K. and Chen, F. (2019) Mouse Behavior as an Index of Phishing Awareness. *17th IFIP Conference on Human Computer Interaction (INTERACT)*, 539 to 548.

Zhang, Y., Hong, J. and Cranor, L. (2007) Cantina: A Content Based Approach to Detecting Phishing Web Sites. *Proceedings of the 16th International Conference on World Wide Web*, 639 to 648.
