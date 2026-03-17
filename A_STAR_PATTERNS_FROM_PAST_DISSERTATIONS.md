# A* Dissertation Patterns (from Phishing ML, Golf Caddy, ITSM)

This document summarises the structural and stylistic patterns observed in three past Brunel CS dissertations that achieved A* (Phishing Classification ML, Dynamic Golf Caddy, AI in ITSM). Use these to align your chapters with what markers expect.

---

## 1. INTRODUCTION (Chapter 1)

### Structure
- **Problem Statement** – Opens with context, statistics, and citations (e.g. "57% of remote workers...", "58% growth in phishing"). Establishes severity and relevance.
- **Aims and Objectives** – Objectives in a **TABLE** (Objective | Explanation). Each objective is numbered and briefly explained.
- **Project Approach / Methodology** – Explicit methodology (Waterfall, Iterative, Agile) with a **TABLE** describing phases.
- **Dissertation Outline** – **TABLE** mapping each chapter to its purpose (Chapter | Title | Purpose).
- **Ethics** – Short section with reference to appendix (Ethics Pro-forma).

### Patterns
- Third-person or formal tone in objectives.
- Clear signposting: "The aim will be delivered through the following objectives."
- Structure of dissertation subsection with chapter-by-chapter preview.

---

## 2. BACKGROUND / LITERATURE REVIEW (Chapter 2)

### Structure
- **Introduction** – Subsection that signposts what the chapter covers and how it leads to requirements.
- **Main content** – Thematic sections (e.g. evolving nature of phishing, current approaches, ML potential).
- **Requirements** – A **FORMAL REQUIREMENTS TABLE** derived from the literature (e.g. Table 2.1: FR1, FR2, NFR1, etc.).
- **Summary** – End-of-chapter summary.

### Patterns
- Requirements are functional (FR) and non-functional (NFR).
- Each requirement has an ID, description, and justification.
- Literature is used to justify each requirement.

---

## 3. REQUIREMENTS ANALYSIS (optional Chapter 3)

- Some A* dissertations have a separate chapter that decomposes/refines requirements.
- **Analysed Requirements Table** – Table 3.1 with refined requirements.
- Links requirements to design products.

---

## 4. DESIGN (Chapter 3 or 4)

### Structure
- **Introduction** – Links design to requirements.
- **Overview of design products and their link to requirements** – **TRACEABILITY TABLE** (e.g. Table 3.1: Design Product | Requirements Addressed).
- **Multiple design products:**
  - Flowchart(s)
  - Pseudocode
  - Wireframes
  - Entity Relationship Diagram
  - UML: Use Case, Class, Sequence diagrams
- **Justification** – Each major design decision justified (e.g. "Justification for Neural Network", "Justification for Meta Classifier").
- **Design Requirements Summary** – Table showing design products map to requirements.
- **Summary** – End-of-chapter summary.

### Patterns
- Design products explicitly linked to requirements.
- Justification subsections for key choices.
- UML diagrams expected (Use Case, Class, Sequence).

---

## 5. IMPLEMENTATION (Chapter 4 or 5)

### Structure
- **Introduction** – What was implemented.
- **Technologies Used and Why** – **TABLE** (Technology | Purpose/Justification).
- **Code walkthroughs** – Subsections with code snippets and figure references.
- **Implementation Requirements Summary** – Table linking implementation to requirements.
- **Summary** – End-of-chapter summary.

### Patterns
- Every technology has a justification.
- Code snippets with figure numbers (e.g. Figure 5.7).
- Walkthrough format: describe what the code does, then show it.

---

## 6. TESTING (Chapter 5 or 6)

### Structure
- **Introduction** – Testing approach.
- **Methods of Testing** – Unit, Integration, System (described).
- **Test Tables** – **FORMAL TEST CASE TABLES** with:
  - Test ID
  - Description / Test Case
  - Expected Result
  - Actual Result
  - Pass/Fail
- **Validation Requirements table** – Links tests to requirements.
- **Summary** – End-of-chapter summary.

### Patterns
- Testing and Evaluation are **SEPARATE** chapters in A* dissertations.
- Test cases are tabulated, not only in prose.
- Traceability: tests map to requirements.

---

## 7. EVALUATION (Chapter 6 or 7)

### Structure
- **Introduction** – Evaluation aims.
- **Ethical Approval** – When participants involved.
- **Methodology** – Survey design, participants, procedure.
- **Results** – **TABLES** of results (e.g. Likert-scale summary, thematic analysis).
- **Statistical Analysis** – When applicable (e.g. Chi-squared, ICC).
- **Limitations** – Evaluation limitations.
- **Summary** – End-of-chapter summary.

### Patterns
- Evaluation is distinct from testing (testing = does it work; evaluation = does it meet the aim, usability, user perception).
- Quantitative and qualitative data presented in tables.
- Ethical approval referenced when needed.

---

## 8. CONCLUSION (Chapter 7 or 8)

### Structure
- **Introduction** – Brief recap.
- **Review against Aim and Objectives** – **Explicit point-by-point** review of each objective (met / partially met / not met).
- **Limitations** – **Numbered subsections** (7.3.1, 7.3.2, 7.3.3...) for each limitation.
- **Future Work** – Bulleted or subsectioned.
- (No "Closing Remarks" as separate section—conclusion is structured and formal.)

### Patterns
- Objectives reviewed explicitly.
- Limitations as numbered subsections (not one paragraph).
- Formal, third-person style in conclusion.
- Future work as actionable items.

---

## Cross-cutting patterns

1. **Tables everywhere** – Requirements, technologies, test cases, evaluation results, design traceability.
2. **Figures with captions** – All diagrams, code snippets, screenshots numbered (Figure X.Y).
3. **Traceability** – Requirements → Design → Implementation → Testing (tables link them).
4. **Chapter summaries** – Every chapter ends with a summary subsection.
5. **Appendices** – Personal Reflection, Ethics, Video link, Design products, Code snippets.
6. **Word count** – A* dissertations: ~20k–35k words.
7. **Formal tone** – Academic, third-person where appropriate; first person in reflection only.

---

## Your dissertation: gaps and recommended actions

| Area | Current state | A* pattern | Action |
|------|---------------|------------|--------|
| Ch1 Objectives | In prose, numbered | Table format | Add Table 1.1 |
| Ch1 Outline | In prose | Table format | Add Table 1.2 |
| Ch1 Approach | In prose | Table of phases | Add Table 1.3 |
| Ch2 Requirements | In text | Formal requirements table | Add Table 2.1 |
| Ch4 Design | Traceability in text | Design products table | Add traceability table |
| Ch5 Implementation | Technologies in prose | Technologies table | Add Table 5.1 |
| Ch6 Testing | Prose + informal | Formal test case table | Add test case table |
| Ch6 Evaluation | Merged with testing | Separate or clearly sectioned | Consider splitting |
| Ch7 Limitations | Paragraphs | Numbered subsections | Add 7.3.1, 7.3.2, etc. |
| Ch7 Conclusion | Personal voice | Formal point-by-point review | Keep review; formalise tone |

---

## Implementation priority

**High impact (do first):**
1. Add tables to Chapter 1 (objectives, outline, approach).
2. Add requirements table to Chapter 2.
3. Add formal test case table to Chapter 6.
4. Add numbered limitations subsections to Chapter 7.

**Medium impact:**
5. Add technologies table to Chapter 5.
6. Add design traceability table to Chapter 4.

**Lower impact (if time allows):**
7. Add wireframes or flowcharts to Design chapter.
8. Consider splitting Testing and Evaluation into separate chapters.
