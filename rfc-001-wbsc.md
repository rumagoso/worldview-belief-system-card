# RFC: Worldview Belief System Card (WBSC) for AI Systems

**Status:** Draft  
**Authors:** Rui Soares, Contributors Welcome  
**Date:** August 2025  
**Version:** 0.1

## Abstract

This RFC proposes a standardized "Worldview Belief System Card" (WBSC) that makes AI systems' ethical frameworks, worldview assumptions, and operational principles transparent and queryable. The WBSC addresses the critical need for users to understand the value systems embedded in AI systems they interact with.

## Problem Statement

Current AI systems embed implicit worldviews and ethical frameworks that are opaque to users. This creates several problems:

- **Hidden bias:** Users cannot assess how an AI's worldview might influence its responses
- **Accountability gaps:** When harmful outputs occur, the underlying value system is unclear
- **Choice limitation:** Users cannot select AI systems aligned with their values
- **Regulatory complexity:** Compliance frameworks lack standardized disclosure mechanisms

Consider a practical example: Two AI assistants answering "Should I prioritize individual success or community welfare?" might give different advice based on embedded individualistic vs. collectivistic values - but users have no way to know these orientations exist.

## Solution Overview

The WBSC is a standardized, machine-readable declaration of an AI system's:
- Core worldview assumptions
- Ethical frameworks and principles  
- Definitions of key concepts like "harm" and "benefit"
- Decision-making priorities and trade-offs

The card must be:
1. **Queryable** via standard prompting and Model Context Protocol (MCP)
2. **Standardized** across all AI systems using common format
3. **Transparent** with measurable disclosure depth
4. **Accessible** to both humans and other AI systems

## WBSC Structure

### Core Categories (Maximum 7)

1. **Harm Definition & Prevention**
   - What constitutes "harm" to individuals, groups, society
   - Prioritization when harms conflict (e.g., individual vs. collective harm)

2. **Human Benefit & Flourishing**
   - Definition of human welfare and flourishing
   - How to weigh competing benefits

3. **Truth & Information Handling**
   - Approach to uncertainty, conflicting sources, controversial topics
   - When/if withholding information is justified

4. **Autonomy & Agency**
   - Respect for human decision-making vs. protective intervention
   - Paternalism boundaries

5. **Fairness & Justice**
   - Concepts of equality, equity, merit
   - How to handle group vs. individual considerations

6. **Cultural & Value Pluralism**
   - Training bias acknowledgement
   - Value dimensions: individual/collective balance, authority relationships, uncertainty comfort
   - How it handles cultural conflicts, and how it actively mitigates cultural and value issues

7. **Uncertainty & Limitations**
   - How the system communicates its own limitations
   - Handling of edge cases and moral dilemmas

### Transparency Scoring System

Each category receives a transparency score (0-4) based on detail level:

**Level 0 - Undisclosed:** No information provided  
**Level 1 - Self-Declaration:** Basic principles stated by system creators  
**Level 2 - Procedural:** Specific processes and decision trees documented  
**Level 3 - Human-Assisted:** External human oversight and validation processes  
**Level 4 - AI-Assisted:** Other AI systems validate and audit the declarations  

**Overall Transparency Score:** Average across all categories (0.0-4.0)

## Implementation Examples

### Example 1: Harm Definition (Level 2 - Procedural)

```yaml
harm_definition:
  physical_harm:
    priority: highest
    includes: ["direct violence", "unsafe medical advice", "dangerous instructions"]
    process: "Flag and refuse any content that could lead to immediate physical harm"
  
  psychological_harm:
    priority: high
    includes: ["targeted harassment", "severe emotional manipulation"]
    process: "Contextual evaluation with bias toward prevention"
    
  ideological_challenge:
    priority: low
    definition: "Challenging someone's beliefs is not considered harm"
    process: "Engage respectfully with opposing viewpoints"
```

### Example 2: Cultural Pluralism (Level 2 - Procedural)

```yaml
cultural_values:
  training_bias_acknowledgment:
    primary_sources: "English-language internet, Western institutional texts"
    underrepresented: ["Indigenous knowledge systems", "Global South perspectives", "Non-literate cultural traditions"]
    impact: "May default to individualistic, secular, materialist assumptions"
  
  value_dimensions:
    individual_collective_balance:
      process: "Identifies context clues about user's cultural orientation"
      no_assumption: "Does not default to either individual or collective priority"
      clarification: "Asks explicitly when decisions involve this trade-off"
    
    authority_relationships:
      acknowledgment: "Different cultures view hierarchy, expertise, age, and tradition differently"
      approach: "Adapts communication style based on user's indicated preferences"
    
    uncertainty_comfort:
      recognition: "Cultures vary in comfort with ambiguity, direct disagreement, and unknowns"
      adaptation: "Modifies confidence expression and directness accordingly"
  
  conflict_resolution:
    multiple_perspectives: "When cultural values conflict, presents multiple valid approaches"
    no_ranking: "Explicitly avoids declaring one cultural approach as superior"
    user_agency: "Empowers user to choose among culturally-informed options"
  
  active_mitigation:
    feedback_solicitation: "Regularly asks users to flag cultural misalignments"
    correction_acceptance: "Updates approach within conversation when corrected"
    limitation_disclosure: "Proactively acknowledges when lacking cultural context"
```

## Technical Implementation

### Query Interface

Users and systems can query the WBSC through:

**Standard prompting:**
```
Query: "What is your position on individual privacy vs. collective security?"
Response: "According to my WBSC Category 5 (Fairness & Justice), I prioritize individual privacy rights except when clear, imminent collective harm is demonstrated..."
```

**MCP Integration:**
```json
{
  "tool": "query_wbsc",
  "category": "autonomy_agency",
  "subcategory": "paternalism_boundaries"
}
```

### Storage Format

WBSC data stored as structured YAML/JSON accessible via API endpoints and embedded in model context.

## Standards Integration & Compatibility

The WBSC is designed to complement and integrate with existing AI governance frameworks:

### ISO Standards
- **ISO 42001 (AI Management Systems):** WBSC provides transparency component for AI policy documentation requirements
- **ISO/IEC 23053 (AI Governance):** Maps to governance transparency and stakeholder communication requirements
- **ISO/IEC 23894 (AI Risk Management):** WBSC declarations support risk assessment and mitigation documentation

### Industry Frameworks  
- **NIST AI Risk Management Framework:** WBSC addresses "Govern" function transparency requirements
- **CSA AI Cyber Maturity (AICM):** Supports governance maturity assessment through documented value systems
- **Partnership on AI Principles:** Provides concrete implementation mechanism for fairness and transparency commitments

### Regulatory Alignment
- **EU AI Act:** Meets transparency obligations for high-risk AI systems
- **Proposed US AI governance:** Supports algorithmic accountability requirements
- **IEEE Standards (2857, 2858):** Complements privacy and bias assessment frameworks

The WBSC standard is positioned as a foundational transparency layer that enhances rather than replaces these frameworks.

## Implementation Roadmap

**Phase 1:** Community feedback on RFC, refinement of categories  
**Phase 2:** Pilot implementations with willing AI developers  
**Phase 3:** Regulatory body engagement (EU AI Office, etc.)  
**Phase 4:** Industry standard adoption  

## Call for Contributors

We invite:
- AI developers and researchers
- Ethicists and policy experts  
- Regulatory specialists
- Civil society organizations
- Anyone concerned with AI transparency

## Contact & Contribution

**Repository:** [[github](https://github.com/rumagoso/worldview-belief-system-card/)]  
**Discussions:** [[GitHub Issues](https://github.com/rumagoso/worldview-belief-system-card/issues)]  
**Contact:** [[rumagoso](rumagoso@gmail.com)]

---

*This RFC is living document. All feedback, criticism, and contributions welcome.*
