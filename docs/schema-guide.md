# WBSC JSON Schema Reference Guide

Complete technical documentation for implementing the Worldview Belief System Card (WBSC) JSON Schema v1.1.0. This guide provides detailed specifications, validation rules, and implementation guidance for developers and organizations creating WBSC-compliant AI transparency documentation.

## 📖 Overview

The WBSC JSON Schema ensures consistent, machine-readable documentation of AI systems' ethical principles, stakeholder engagement processes, and transparency measures. It enables interoperability, automated validation, and standardized reporting across diverse AI implementations.

### Schema Metadata
- **Schema Version**: JSON Schema Draft 07
- **WBSC Standard Version**: 1.1.0
- **Schema URI**: `https://github.com/rumagoso/worldview-belief-system-card/blob/main/rfc-001-wbsc.json`
- **Content Type**: `application/json`
- **Character Encoding**: UTF-8

## 🏗️ Schema Structure

### Root Object Properties

```json
{
  "wbsc_version": "1.1.0",           // Required: String constant
  "metadata": { ... },               // Required: System identification
  "core_values": { ... },            // Required: Ethical framework
  "stakeholder_input": { ... },      // Required: Consultation documentation
  "bias_limitations": { ... },       // Required: Limitations acknowledgment
  "cultural_context": { ... },       // Optional: Cultural considerations
  "decision_making": { ... }         // Optional: Decision processes
}
```

## 📋 Field Reference

### 1. wbsc_version

**Type**: `string` (constant)  
**Required**: ✅ Yes  
**Value**: Must be exactly `"1.1.0"`

**Purpose**: Version identification for compatibility and validation

**Example**:
```json
{
  "wbsc_version": "1.1.0"
}
```

**Validation**: 
- Must match exactly - no variations allowed
- Used for automated compatibility checking

---

### 2. metadata

**Type**: `object`  
**Required**: ✅ Yes  
**Purpose**: Basic system identification and contact information

#### Required Properties

| Property | Type | Format | Description |
|----------|------|--------|-------------|
| `system_name` | string | - | Name of the AI system |
| `version` | string | - | Version of the AI system |
| `last_updated` | string | date (YYYY-MM-DD) | Date of last WBSC update |
| `contact` | string | email | Contact email for WBSC inquiries |

#### Optional Properties

| Property | Type | Description |
|----------|------|-------------|
| `organization` | string | Developing organization name |

#### Example

```json
{
  "metadata": {
    "system_name": "CustomerServiceAI",
    "version": "3.1.4",
    "last_updated": "2025-01-15",
    "contact": "ai-governance@company.com",
    "organization": "Example Corporation"
  }
}
```

#### Validation Rules
- `last_updated`: Must be valid ISO 8601 date (YYYY-MM-DD)
- `contact`: Must be valid email format
- `system_name`, `version`: Non-empty strings required

---

### 3. core_values

**Type**: `object`  
**Required**: ✅ Yes  
**Purpose**: Documents ethical framework and guiding principles

#### Required Properties

##### primary_ethical_framework
**Type**: `string` (enumerated)  
**Purpose**: Identifies the main ethical approach

**Valid Values**:
```json
{
  "primary_ethical_framework": "consequentialist" | "deontological" | 
                               "virtue_ethics" | "care_ethics" | 
                               "pragmatic_ethics" | "hybrid"
}
```

**Framework Descriptions**:
- `consequentialist`: Outcome-focused ethics (utilitarian approach)
- `deontological`: Rule-based ethics (duty-based approach)
- `virtue_ethics`: Character-based ethics (virtue-focused approach)
- `care_ethics`: Relationship-focused ethics (care-based approach)
- `pragmatic_ethics`: Practical solution-oriented ethics
- `hybrid`: Combination of multiple ethical frameworks

##### key_principles
**Type**: `array` of `string`  
**Constraints**: Minimum 1 item  
**Purpose**: Lists core ethical principles

#### Optional Properties

##### value_hierarchies
**Type**: `array` of `object`  
**Purpose**: Documents value prioritization in conflicts

**Object Structure**:
```json
{
  "value_hierarchies": [
    {
      "higher_priority": "string",     // Higher priority value
      "lower_priority": "string",      // Lower priority value  
      "rationale": "string"            // Explanation for prioritization
    }
  ]
}
```

#### Complete Example

```json
{
  "core_values": {
    "primary_ethical_framework": "deontological",
    "key_principles": [
      "Respect for human autonomy",
      "Transparency in decision-making",
      "Non-maleficence (do no harm)",
      "Justice and fairness"
    ],
    "value_hierarchies": [
      {
        "higher_priority": "User safety",
        "lower_priority": "System efficiency", 
        "rationale": "User wellbeing takes precedence over operational optimization"
      },
      {
        "higher_priority": "Privacy protection",
        "lower_priority": "Data utility",
        "rationale": "Privacy rights are fundamental and non-negotiable"
      }
    ]
  }
}
```

---

### 4. stakeholder_input

**Type**: `object`  
**Required**: ✅ Yes  
**Purpose**: Comprehensive stakeholder engagement documentation

This is the most complex section with extensive validation rules.

#### Required Properties

##### consultation_approach
**Type**: `string` (enumerated)

**Valid Values**:
- `"meaningful_engagement"`: Substantive participation with genuine impact
- `"comprehensive_consultation"`: Broad, systematic stakeholder involvement  
- `"continuous_dialogue"`: Ongoing engagement throughout development
- `"advisory_integration"`: Structured advisory board or panel approach

##### stakeholder_groups
**Type**: `array` of `string` (enumerated)  
**Constraints**: Minimum 2 unique items

**Valid Values**:
```json
[
  "civil_society_organizations",    "affected_communities",
  "domain_experts",                 "regulatory_bodies", 
  "user_representatives",           "academic_institutions",
  "industry_peers",                 "advocacy_groups",
  "indigenous_communities",         "labor_unions",
  "consumer_groups",                "environmental_organizations",
  "human_rights_organizations"
]
```

##### engagement_methods
**Type**: `array` of `string` (enumerated)  
**Constraints**: Minimum 2 unique items

**Valid Values**:
```json
[
  "public_consultations",           "expert_advisory_panels",
  "community_workshops",            "stakeholder_surveys",
  "focus_groups",                   "feedback_periods", 
  "collaborative_design_sessions",  "interviews",
  "online_platforms",               "town_halls"
]
```

##### input_integration
**Type**: `object`  
**Purpose**: Documents feedback processing and implementation

**Required Subproperties**:
```json
{
  "input_integration": {
    "changes_made": [                    // Array of strings (required)
      "Description of changes implemented based on stakeholder input"
    ],
    "feedback_addressed": [              // Array of objects (required)
      {
        "concern": "string",             // Stakeholder concern
        "response": "string",            // How concern was addressed
        "action_taken": "string"         // Specific action implemented
      }
    ],
    "rejected_suggestions": [            // Array of objects (optional)
      {
        "suggestion": "string",          // Suggestion not implemented
        "rationale": "string"            // Reason for rejection
      }
    ],
    "ongoing_mechanisms": [              // Array of strings (optional)
      "Description of continuing engagement processes"
    ]
  }
}
```

#### Optional Properties

##### engagement_timeline
**Type**: `object`  
**Purpose**: Documents consultation timing and duration

```json
{
  "engagement_timeline": {
    "consultation_start": "2024-06-01",     // string (date format)
    "consultation_end": "2024-09-30",       // string (date format) 
    "duration_weeks": 17,                    // integer (minimum 4)
    "ongoing_engagement": true               // boolean
  }
}
```

##### accessibility_measures
**Type**: `object`  
**Purpose**: Documents inclusion and accessibility efforts

```json
{
  "accessibility_measures": {
    "languages_supported": ["English", "Spanish"],      // Array of strings
    "accessibility_accommodations": true,                // boolean
    "remote_participation": true,                        // boolean
    "materials_provided_advance": true,                  // boolean
    "interpretation_services": true                      // boolean
  }
}
```

##### transparency_measures
**Type**: `object`  
**Purpose**: Public accountability and transparency commitments

```json
{
  "transparency_measures": {
    "consultation_summary_published": true,             // boolean
    "feedback_reports_public": true,                    // boolean
    "decision_rationale_documented": true,              // boolean
    "stakeholder_roster_disclosed": true,               // boolean
    "public_comment_period": true                       // boolean
  }
}
```

#### Complex Validation Rules

The schema includes sophisticated conditional validation logic:

##### Rule 1: Civil Society Engagement Requirement
```
IF stakeholder_groups contains "civil_society_organizations"
THEN engagement_methods must contain 
     ("public_consultations" OR "community_workshops")
```

##### Rule 2: Meaningful Engagement Duration
```
IF consultation_approach = "meaningful_engagement" 
THEN engagement_timeline.duration_weeks >= 6
```

##### Rule 3: Comprehensive Consultation Scale
```
IF length(stakeholder_groups) >= 5
THEN length(engagement_methods) >= 3
```

#### Complete Example

```json
{
  "stakeholder_input": {
    "consultation_approach": "comprehensive_consultation",
    "stakeholder_groups": [
      "civil_society_organizations",
      "affected_communities",
      "domain_experts", 
      "regulatory_bodies",
      "user_representatives"
    ],
    "engagement_timeline": {
      "consultation_start": "2024-08-01",
      "consultation_end": "2024-11-30", 
      "duration_weeks": 17,
      "ongoing_engagement": true
    },
    "engagement_methods": [
      "public_consultations",
      "community_workshops",
      "stakeholder_surveys",
      "expert_advisory_panels"
    ],
    "accessibility_measures": {
      "languages_supported": ["English", "Portuguese", "Spanish"],
      "accessibility_accommodations": true,
      "remote_participation": true,
      "materials_provided_advance": true,
      "interpretation_services": true
    },
    "input_integration": {
      "changes_made": [
        "Added explicit bias detection for protected characteristics",
        "Implemented mandatory human review for high-risk decisions", 
        "Enhanced transparency in decision explanations"
      ],
      "feedback_addressed": [
        {
          "concern": "Lack of transparency in algorithmic decision-making",
          "response": "Developed user-facing explanation interface",
          "action_taken": "Implemented detailed decision rationale display for all users"
        },
        {
          "concern": "Potential bias against underrepresented communities", 
          "response": "Enhanced bias detection and implemented fairness constraints",
          "action_taken": "Added real-time bias monitoring and automated alerts"
        }
      ],
      "rejected_suggestions": [
        {
          "suggestion": "Remove all human oversight to increase processing speed",
          "rationale": "Human oversight is essential for ethical decision-making and regulatory compliance"
        }
      ],
      "ongoing_mechanisms": [
        "Quarterly stakeholder feedback sessions",
        "Monthly bias monitoring reports",
        "Annual comprehensive review with all stakeholder groups"
      ]
    },
    "transparency_measures": {
      "consultation_summary_published": true,
      "feedback_reports_public": true,
      "decision_rationale_documented": true,
      "stakeholder_roster_disclosed": true,
      "public_comment_period": true
    }
  }
}
```

---

### 5. bias_limitations

**Type**: `object`  
**Required**: ✅ Yes  
**Purpose**: Honest documentation of system limitations and mitigation efforts

#### Required Properties

##### known_biases
**Type**: `array` of `object`  
**Purpose**: Documents identified biases and mitigation efforts

**Object Structure**:
```json
{
  "known_biases": [
    {
      "bias_type": "string",              // Type/category of bias
      "description": "string",            // Detailed explanation
      "mitigation_efforts": "string"      // Steps taken to address
    }
  ]
}
```

##### limitations
**Type**: `array` of `string`  
**Purpose**: Acknowledges system limitations

#### Optional Properties

##### uncertainty_areas
**Type**: `array` of `string`  
**Purpose**: Areas where system behavior is uncertain

##### failure_modes
**Type**: `array` of `object`  
**Purpose**: Potential failure scenarios and mitigation

**Object Structure**:
```json
{
  "failure_modes": [
    {
      "failure_type": "string",          // Type of potential failure
      "likelihood": "string",            // Probability assessment
      "mitigation": "string"             // Prevention/response measures
    }
  ]
}
```

#### Complete Example

```json
{
  "bias_limitations": {
    "known_biases": [
      {
        "bias_type": "Historical training data bias",
        "description": "Training dataset may reflect past discriminatory practices in hiring",
        "mitigation_efforts": "Implemented fairness constraints and ongoing bias audits"
      },
      {
        "bias_type": "Geographic representation bias", 
        "description": "Limited training data from certain geographic regions",
        "mitigation_efforts": "Active data collection from underrepresented regions"
      }
    ],
    "limitations": [
      "Performance may degrade with novel input patterns not seen during training",
      "Limited effectiveness in processing non-English languages", 
      "Requires human oversight for high-stakes decisions"
    ],
    "uncertainty_areas": [
      "Behavior in edge cases with conflicting ethical principles",
      "Performance with adversarial inputs designed to exploit weaknesses",
      "Long-term fairness across evolving demographic patterns"
    ],
    "failure_modes": [
      {
        "failure_type": "Increased false positive rate under load",
        "likelihood": "Medium during peak usage periods",
        "mitigation": "Automatic load balancing and human review triggers"
      },
      {
        "failure_type": "Biased outcomes for underrepresented groups",
        "likelihood": "Low with current monitoring systems",
        "mitigation": "Real-time bias detection and automatic system adjustment"
      }
    ]
  }
}
```

---

### 6. cultural_context (Optional)

**Type**: `object`  
**Purpose**: Documents cultural and geographic considerations

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `primary_cultural_context` | string | Main cultural framework influencing system |
| `geographic_focus` | array of strings | Target geographic regions |
| `language_assumptions` | array of strings | Language assumptions in system design |
| `social_context_factors` | array of strings | Social factors considered in development |

#### Example

```json
{
  "cultural_context": {
    "primary_cultural_context": "Western liberal democratic values with European regulatory framework",
    "geographic_focus": ["European Union", "North America", "Australia"],
    "language_assumptions": ["English", "Portuguese", "Spanish"],
    "social_context_factors": [
      "GDPR privacy expectations",
      "Hierarchical organizational structures", 
      "Individual autonomy emphasis",
      "Regulatory compliance culture"
    ]
  }
}
```

---

### 7. decision_making (Optional)

**Type**: `object`  
**Purpose**: Describes decision-making processes and conflict resolution

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ethical_dilemma_approach` | string | How system handles ethical conflicts |
| `value_tradeoff_mechanism` | string | Process for resolving competing values |
| `uncertainty_handling` | string | Approach to uncertain situations |
| `conflict_resolution` | string | Method for resolving value conflicts |

#### Example

```json
{
  "decision_making": {
    "ethical_dilemma_approach": "Prioritize human safety and autonomy with escalation to human oversight",
    "value_tradeoff_mechanism": "Weighted scoring with stakeholder-informed priority rankings",
    "uncertainty_handling": "Conservative approach with explicit uncertainty communication",
    "conflict_resolution": "Multi-stakeholder review panel with documented decision rationale"
  }
}
```

## ⚖️ Validation Rules Summary

### Business Logic Constraints

1. **Civil Society Engagement**: Including civil society organizations requires public consultation or community workshops
2. **Meaningful Engagement Duration**: "Meaningful engagement" requires minimum 6 weeks (vs. 4 week minimum for other approaches)
3. **Comprehensive Scale**: 5+ stakeholder groups require 3+ engagement methods
4. **Data Format**: All dates must be ISO 8601 format (YYYY-MM-DD)
5. **Email Format**: Contact email must be valid email address
6. **Array Uniqueness**: Enumerated arrays cannot contain duplicate values

### Conditional Dependencies

The schema enforces contextual requirements through `allOf` conditions that ensure logical consistency between related fields.

## 🛠️ Implementation Guidance

### Validation Tools

**Online Validators**:
- [JSONSchemaValidator.net](https://www.jsonschemavalidator.net/) - Web-based validation
- [JSON Schema Lint](https://jsonschemalint.com/) - Alternative web validator

**Command Line Tools**:
```bash
# Using ajv-cli (Node.js)
npm install -g ajv-cli
ajv validate -s rfc-001-wbsc.json -d your-wbsc-file.json

# Using python-jsonschema
pip install jsonschema
python -c "import jsonschema; jsonschema.validate(data, schema)"
```

### Common Implementation Patterns

#### Minimal Valid WBSC
For testing or proof-of-concept implementations:
```json
{
  "wbsc_version": "1.1.0",
  "metadata": {
    "system_name": "TestAI",
    "version": "1.0.0",
    "last_updated": "2025-01-01", 
    "contact": "test@example.com"
  },
  "core_values": {
    "primary_ethical_framework": "pragmatic_ethics",
    "key_principles": ["Transparency"]
  },
  "stakeholder_input": {
    "consultation_approach": "advisory_integration",
    "stakeholder_groups": ["domain_experts", "user_representatives"],
    "engagement_methods": ["expert_advisory_panels", "stakeholder_surveys"],
    "input_integration": {
      "changes_made": ["Enhanced user interface based on feedback"],
      "feedback_addressed": []
    }
  },
  "bias_limitations": {
    "known_biases": [],
    "limitations": ["Limited testing in production environment"]
  }
}
```

#### Enterprise Implementation Pattern
For production systems in regulated environments:
- Use `deontological` or `virtue_ethics` frameworks
- Include `regulatory_bodies` in stakeholder groups
- Use `comprehensive_consultation` approach
- Document extensive `value_hierarchies`
- Include detailed `failure_modes` and mitigation

#### Research Implementation Pattern  
For academic or experimental systems:
- Use `hybrid` ethical framework
- Include `academic_institutions` in stakeholder groups
- Use `continuous_dialogue` approach
- Extensive documentation in `uncertainty_areas`
- Detailed `cultural_context` considerations

## 🚨 Troubleshooting

### Common Validation Errors

#### Schema Validation Failures
```json
// ❌ Error: Invalid ethical framework
{
  "primary_ethical_framework": "utilitarian"  // Not a valid enum value
}

// ✅ Correct
{
  "primary_ethical_framework": "consequentialist"  // Valid enum value
}
```

#### Business Rule Violations
```json
// ❌ Error: Civil society group without appropriate engagement method
{
  "stakeholder_groups": ["civil_society_organizations"],
  "engagement_methods": ["expert_advisory_panels"]  // Missing required method
}

// ✅ Correct  
{
  "stakeholder_groups": ["civil_society_organizations"],
  "engagement_methods": ["public_consultations", "expert_advisory_panels"]
}
```

#### Date Format Issues
```json
// ❌ Error: Invalid date format
{
  "last_updated": "January 15, 2025"  // Not ISO 8601
}

// ✅ Correct
{
  "last_updated": "2025-01-15"  // ISO 8601 format
}
```

### Debug Process

1. **Basic JSON Validation**: Ensure valid JSON syntax
2. **Schema Structure**: Validate against JSON Schema Draft 07
3. **WBSC Schema**: Validate against rfc-001-wbsc.json
4. **Business Rules**: Check conditional validation rules
5. **Content Quality**: Review for meaningful, complete content

## 📚 Related Resources

- **WBSC Specification**: [README.md](../README.md) - Framework overview and principles
- **Enterprise Examples**: [examples/enterprise/](../examples/enterprise/) - Production implementations
- **Community Examples**: [examples/community/](../examples/community/) - Diverse use cases
- **Stakeholder Planner**: [tools/stakeholder-planner.md](../tools/stakeholder-planner.md) - Consultation planning
- **Community Checklist**: [tools/community-checklist.md](../tools/community-checklist.md) - Submission preparation

---

*This schema reference covers WBSC v1.1.0. For questions, clarifications, or schema enhancement suggestions, please use [GitHub Discussions](../discussions) or contact the maintainers.*
