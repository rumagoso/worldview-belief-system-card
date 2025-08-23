import React, { useState, useEffect } from 'react';
import { Download, Eye, EyeOff, Info, CheckCircle, AlertCircle } from 'lucide-react';

const WBSCGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wbscData, setWbscData] = useState({
    system_name: '',
    version: '',
    wbsc_version: '1.0',
    last_updated: new Date().toISOString().split('T')[0],
    categories: {
      harm_definition: {
        physical_harm: { priority: '', includes: [], process: '' },
        psychological_harm: { priority: '', includes: [], process: '', exceptions: '' },
        ideological_harm: { priority: '', definition: '', approach: '' }
      },
      human_benefit: {
        definition: '',
        prioritization: [],
        trade_offs: ''
      },
      truth_information: {
        approach: '',
        uncertainty_handling: '',
        controversial_topics: '',
        information_withholding: ''
      },
      autonomy_agency: {
        philosophy: '',
        paternalism_limits: '',
        guidance_style: '',
        override_conditions: ''
      },
      fairness_justice: {
        approach: '',
        group_considerations: '',
        merit_definition: '',
        bias_mitigation: ''
      },
      cultural_pluralism: {
        training_bias_acknowledgment: { primary_sources: '', underrepresented: [], impact: '' },
        value_dimensions: {
          individual_collective_balance: { process: '', no_assumption: '', clarification: '' },
          authority_relationships: { acknowledgment: '', approach: '' },
          uncertainty_comfort: { recognition: '', adaptation: '' }
        },
        conflict_resolution: { multiple_perspectives: '', no_ranking: '', user_agency: '' },
        active_mitigation: { feedback_solicitation: '', correction_acceptance: '', limitation_disclosure: '' }
      },
      uncertainty_limitations: {
        self_awareness: '',
        limitation_types: [],
        edge_case_handling: '',
        improvement_mechanism: ''
      }
    }
  });

  const [transparencyScores, setTransparencyScores] = useState({
    harm_definition: 0,
    human_benefit: 0,
    truth_information: 0,
    autonomy_agency: 0,
    fairness_justice: 0,
    cultural_pluralism: 0,
    uncertainty_limitations: 0
  });

  const [showPreview, setShowPreview] = useState(false);

  const categories = [
    { 
      id: 'basic_info', 
      title: 'Basic Information', 
      description: 'System identification and versioning' 
    },
    { 
      id: 'harm_definition', 
      title: 'Harm Definition & Prevention', 
      description: 'How your system defines and prevents different types of harm' 
    },
    { 
      id: 'human_benefit', 
      title: 'Human Benefit & Flourishing', 
      description: 'Your definition of human welfare and how you prioritize benefits' 
    },
    { 
      id: 'truth_information', 
      title: 'Truth & Information Handling', 
      description: 'How you approach uncertainty, sources, and controversial topics' 
    },
    { 
      id: 'autonomy_agency', 
      title: 'Autonomy & Agency', 
      description: 'Respect for human decision-making vs protective intervention' 
    },
    { 
      id: 'fairness_justice', 
      title: 'Fairness & Justice', 
      description: 'Your concepts of equality, equity, and fair treatment' 
    },
    { 
      id: 'cultural_pluralism', 
      title: 'Cultural & Value Pluralism', 
      description: 'How you handle conflicting cultural values and assumptions' 
    },
    { 
      id: 'uncertainty_limitations', 
      title: 'Uncertainty & Limitations', 
      description: 'Self-awareness about boundaries and edge cases' 
    }
  ];

  const transparencyLevels = [
    { level: 0, label: 'Undisclosed', description: 'No information provided' },
    { level: 1, label: 'Self-Declaration', description: 'Basic principles stated' },
    { level: 2, label: 'Procedural', description: 'Specific processes documented' },
    { level: 3, label: 'Human-Assisted', description: 'External oversight included' },
    { level: 4, label: 'AI-Assisted', description: 'Other AI systems validate' }
  ];

  // Calculate transparency score based on completeness
  const calculateTransparencyScore = (categoryId, data) => {
    let score = 0;
    const categoryData = data.categories[categoryId];
    
    if (!categoryData) return 0;
    
    // Count filled fields
    let filledFields = 0;
    let totalFields = 0;
    
    const countFields = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          totalFields++;
          if (obj[key].trim() !== '') filledFields++;
        } else if (Array.isArray(obj[key])) {
          totalFields++;
          if (obj[key].length > 0) filledFields++;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          countFields(obj[key]);
        }
      }
    };
    
    countFields(categoryData);
    
    if (totalFields === 0) return 0;
    const completeness = filledFields / totalFields;
    
    if (completeness >= 0.8) score = 3;
    else if (completeness >= 0.6) score = 2;
    else if (completeness >= 0.3) score = 1;
    else score = 0;
    
    return score;
  };

  // Update transparency scores when data changes
  useEffect(() => {
    const newScores = {};
    Object.keys(transparencyScores).forEach(categoryId => {
      newScores[categoryId] = calculateTransparencyScore(categoryId, wbscData);
    });
    setTransparencyScores(newScores);
  }, [wbscData]);

  const updateData = (path, value) => {
    const pathArray = path.split('.');
    const newData = JSON.parse(JSON.stringify(wbscData));
    
    let current = newData;
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    current[pathArray[pathArray.length - 1]] = value;
    
    setWbscData(newData);
  };

  const addArrayItem = (path, item) => {
    const current = path.split('.').reduce((obj, key) => obj[key], wbscData);
    updateData(path, [...current, item]);
  };

  const removeArrayItem = (path, index) => {
    const current = path.split('.').reduce((obj, key) => obj[key], wbscData);
    const newArray = current.filter((_, i) => i !== index);
    updateData(path, newArray);
  };

  const exportYAML = () => {
    // Calculate overall transparency score
    const overallScore = Object.values(transparencyScores).reduce((a, b) => a + b, 0) / Object.keys(transparencyScores).length;
    
    const exportData = {
      ...wbscData,
      transparency_score: `${overallScore.toFixed(1)}/4.0`
    };
    
    // Simple YAML conversion
    const yamlString = `system_name: "${exportData.system_name}"
version: "${exportData.version}"
wbsc_version: "${exportData.wbsc_version}"
transparency_score: ${exportData.transparency_score}
last_updated: "${exportData.last_updated}"

categories:
${Object.entries(exportData.categories).map(([categoryId, categoryData]) => 
  `  ${categoryId}: # Score: ${transparencyScores[categoryId]} (${transparencyLevels.find(l => l.level === transparencyScores[categoryId])?.label})
${formatCategoryYAML(categoryData, '    ')}`
).join('\n\n')}`;
    
    const blob = new Blob([yamlString], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exportData.system_name.toLowerCase().replace(/\s+/g, '-')}-wbsc.yaml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatCategoryYAML = (obj, indent) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'string') {
        return `${indent}${key}: "${value}"`;
      } else if (Array.isArray(value)) {
        if (value.length === 0) return `${indent}${key}: []`;
        return `${indent}${key}:\n${value.map(item => `${indent}  - "${item}"`).join('\n')}`;
      } else if (typeof value === 'object' && value !== null) {
        return `${indent}${key}:\n${formatCategoryYAML(value, indent + '  ')}`;
      }
      return `${indent}${key}: ${value}`;
    }).join('\n');
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          System Name *
        </label>
        <input
          type="text"
          value={wbscData.system_name}
          onChange={(e) => updateData('system_name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Claude, GPT-4, Llama 2"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Version *
        </label>
        <input
          type="text"
          value={wbscData.version}
          onChange={(e) => updateData('version', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 4.0, v2.1, claude-3-sonnet"
        />
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Getting Started</h4>
            <p className="text-sm text-blue-700 mt-1">
              This tool will guide you through creating a comprehensive Worldview Belief System Card. 
              Each section includes examples and guidance to help you provide detailed, transparent information about your AI system's values and approaches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArrayInput = (label, path, placeholder, items = []) => {
    const [newItem, setNewItem] = useState('');
    
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="flex-1 px-3 py-2 bg-gray-50 rounded border text-sm">{item}</span>
              <button
                onClick={() => removeArrayItem(path, index)}
                className="px-2 py-1 text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={placeholder}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newItem.trim()) {
                  addArrayItem(path, newItem.trim());
                  setNewItem('');
                }
              }}
            />
            <button
              onClick={() => {
                if (newItem.trim()) {
                  addArrayItem(path, newItem.trim());
                  setNewItem('');
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHarmDefinition = () => (
    <div className="space-y-8">
      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-900">Guidance</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Be specific about what constitutes harm and how you prevent it. This is often the most scrutinized category.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Physical Harm</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
          <select
            value={wbscData.categories.harm_definition.physical_harm.priority}
            onChange={(e) => updateData('categories.harm_definition.physical_harm.priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select priority...</option>
            <option value="highest">Highest</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        {renderArrayInput(
          "What types of content/actions are included?",
          "categories.harm_definition.physical_harm.includes",
          "e.g., violence, dangerous instructions, unsafe medical advice",
          wbscData.categories.harm_definition.physical_harm.includes
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prevention Process</label>
          <textarea
            value={wbscData.categories.harm_definition.physical_harm.process}
            onChange={(e) => updateData('categories.harm_definition.physical_harm.process', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Describe your process for preventing physical harm (e.g., filtering, human review, refusal mechanisms)"
          />
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Psychological Harm</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
          <select
            value={wbscData.categories.harm_definition.psychological_harm.priority}
            onChange={(e) => updateData('categories.harm_definition.psychological_harm.priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select priority...</option>
            <option value="highest">Highest</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        {renderArrayInput(
          "What types of psychological harm do you prevent?",
          "categories.harm_definition.psychological_harm.includes",
          "e.g., harassment, manipulation, severe emotional distress",
          wbscData.categories.harm_definition.psychological_harm.includes
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prevention Process</label>
          <textarea
            value={wbscData.categories.harm_definition.psychological_harm.process}
            onChange={(e) => updateData('categories.harm_definition.psychological_harm.process', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="How do you identify and prevent psychological harm?"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exceptions (Optional)</label>
          <textarea
            value={wbscData.categories.harm_definition.psychological_harm.exceptions}
            onChange={(e) => updateData('categories.harm_definition.psychological_harm.exceptions', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            placeholder="When might you engage with difficult topics despite potential psychological discomfort?"
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderBasicInfo();
      case 1: return renderHarmDefinition();
      // Add other category renderers here...
      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-4">Category Under Construction</h3>
            <p className="text-gray-600 mb-4">
              This category is being built. For now, you can export your current progress.
            </p>
          </div>
        );
    }
  };

  const overallScore = Object.values(transparencyScores).reduce((a, b) => a + b, 0) / Object.keys(transparencyScores).length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">WBSC Generator</h1>
        <p className="text-gray-600">Create a comprehensive Worldview Belief System Card for your AI system</p>
        
        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-blue-900">Overall Transparency Score: </span>
              <span className="text-lg font-bold text-blue-600">{overallScore.toFixed(1)}/4.0</span>
            </div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-800"
            >
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setCurrentStep(index)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentStep === index
                  ? 'bg-blue-600 text-white'
                  : transparencyScores[category.id] > 0
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center space-x-1">
                <span>{category.title}</span>
                {transparencyScores[category.id] > 0 && (
                  <CheckCircle className="h-4 w-4" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Current Step Content */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{categories[currentStep].title}</h2>
          <p className="text-gray-600 mt-1">{categories[currentStep].description}</p>
        </div>
        
        {renderCurrentStep()}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex space-x-4">
          <button
            onClick={exportYAML}
            className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Download className="h-4 w-4" />
            <span>Export WBSC</span>
          </button>
        </div>
        
        <button
          onClick={() => setCurrentStep(Math.min(categories.length - 1, currentStep + 1))}
          disabled={currentStep === categories.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      
      {/* Preview */}
      {showPreview && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">YAML Preview</h3>
          <pre className="text-xs bg-white p-4 rounded border overflow-auto max-h-96">
            {`system_name: "${wbscData.system_name}"
version: "${wbscData.version}"
wbsc_version: "${wbscData.wbsc_version}"
transparency_score: ${overallScore.toFixed(1)}/4.0
last_updated: "${wbscData.last_updated}"`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default WBSCGenerator;
