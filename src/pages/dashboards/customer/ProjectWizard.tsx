import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  Image,
  Target,
  UploadCloud,
  Check
} from 'lucide-react';

interface WizardStep {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const ProjectWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [script, setScript] = useState('');
  
  // Define the wizard steps
  const steps: WizardStep[] = [
    { id: 'project-name', title: 'Project Name', icon: <CheckCircle size={20} /> },
    { id: 'script', title: 'Script', icon: <FileText size={20} /> },
    { id: 'storyboard', title: 'Storyboard', icon: <Image size={20} /> },
    { id: 'assets', title: 'Assets', icon: <UploadCloud size={20} /> },
    { id: 'goals', title: 'Goals', icon: <Target size={20} /> }
  ];
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit the project
      navigate('/dashboard/projects');
    }
  };
  
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const isStepComplete = (step: number) => {
    if (step === 0) return projectName.trim() !== '';
    if (step === 1) return script.trim() !== '';
    return false;
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          to="/dashboard/projects"
          className="inline-flex items-center text-gray-700 hover:text-black mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Projects
        </Link>
        
        <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
        <p className="mt-1 text-gray-500">
          Tell us about your video project and we'll help bring it to life.
        </p>
      </div>
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 ${index === steps.length - 1 ? '' : 'relative'}`}
            >
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index < currentStep ? 'bg-black text-white' : index === currentStep ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < currentStep ? <Check size={16} /> : index + 1}
                </div>
                <div className="ml-2 hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`hidden md:block absolute top-4 left-0 w-full h-0.5 ${
                    index < currentStep ? 'bg-black' : 'bg-gray-200'
                  }`}
                  style={{ left: '2rem' }}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 md:hidden">
          <div className="text-sm font-medium text-gray-900">{steps[currentStep].title}</div>
        </div>
      </div>
      
      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        {currentStep === 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Name Your Project</h2>
            <p className="text-gray-500 mb-6">
              Give your project a descriptive name to help you identify it later.
            </p>
            
            <div className="mb-6">
              <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Company Introduction Video"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Project Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Corporate Video', 'Commercial', 'Event Coverage'].map((type) => (
                  <div
                    key={type}
                    className="relative border rounded-md p-3 flex cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{type}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 h-5 w-5 border border-gray-300 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Estimated Length</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {['< 1 minute', '1-3 minutes', '3-5 minutes', '5+ minutes'].map((length) => (
                  <div
                    key={length}
                    className="relative border rounded-md p-3 flex cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{length}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 h-5 w-5 border border-gray-300 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add Your Script</h2>
            <p className="text-gray-500 mb-6">
              Upload, paste, or link to your script document. This helps our team understand your vision.
            </p>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="script" className="block text-sm font-medium text-gray-700">
                  Script Text
                </label>
                <span className="text-xs text-gray-500">or upload a file below</span>
              </div>
              <textarea
                id="script"
                rows={10}
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Paste your script text here..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              ></textarea>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mb-6">
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">
                    Drag and drop your file here
                  </p>
                  <p className="text-xs text-gray-500">
                    Support for .txt, .doc, .docx, .pdf (max 10MB)
                  </p>
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer"
                  >
                    <UploadCloud className="mr-2 -ml-1 h-5 w-5 text-gray-400" />
                    <span>Select file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="script-link" className="block text-sm font-medium text-gray-700 mb-1">
                Or Add a Link
              </label>
              <input
                type="text"
                id="script-link"
                placeholder="e.g., Google Docs, Dropbox, or OneDrive link"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add Storyboard</h2>
            <p className="text-gray-500 mb-6">
              Upload or link to your storyboard to help visualize your video.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mb-6">
              <div className="text-center">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">
                    Drag and drop your storyboard files here
                  </p>
                  <p className="text-xs text-gray-500">
                    Support for .jpg, .png, .pdf (max 20MB)
                  </p>
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="storyboard-upload"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer"
                  >
                    <UploadCloud className="mr-2 -ml-1 h-5 w-5 text-gray-400" />
                    <span>Select files</span>
                    <input id="storyboard-upload" name="storyboard-upload" type="file" className="sr-only" multiple />
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="storyboard-link" className="block text-sm font-medium text-gray-700 mb-1">
                Or Add a Link
              </label>
              <input
                type="text"
                id="storyboard-link"
                placeholder="e.g., Google Drive, Dropbox, or OneDrive link"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Assets</h2>
            <p className="text-gray-500 mb-6">
              Upload or link to any assets you want to include in your video.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mb-6">
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">
                    Drag and drop files here
                  </p>
                  <p className="text-xs text-gray-500">
                    Logos, images, videos, audio files (max 500MB total)
                  </p>
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="assets-upload"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer"
                  >
                    <UploadCloud className="mr-2 -ml-1 h-5 w-5 text-gray-400" />
                    <span>Select files</span>
                    <input id="assets-upload" name="assets-upload" type="file" className="sr-only" multiple />
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="assets-link" className="block text-sm font-medium text-gray-700 mb-1">
                Or Add a Link to Your Assets
              </label>
              <input
                type="text"
                id="assets-link"
                placeholder="e.g., Google Drive, Dropbox, or OneDrive link"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Asset Types (Select all that apply)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Logos', 'Images', 'Videos', 'Audio', 'Brand Guidelines', 'Fonts', 'Graphics', 'Other'].map((type) => (
                  <div
                    key={type}
                    className="relative border rounded-md px-3 py-2 flex items-center cursor-pointer focus:outline-none"
                  >
                    <div className="min-w-0 flex-1 text-sm">
                      <span className="font-medium text-gray-700">{type}</span>
                    </div>
                    <div className="ml-3 flex-shrink-0 h-5 w-5">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Goals & Objectives</h2>
            <p className="text-gray-500 mb-6">
              Tell us what you want to achieve with this video.
            </p>
            
            <div className="mb-6">
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                Goals & Objectives
              </label>
              <textarea
                id="goals"
                rows={6}
                placeholder="Describe what you want to achieve with this video..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              ></textarea>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Primary Goal (Select one)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Raise Brand Awareness', 'Explain a Product/Service', 'Drive Conversions'].map((goal) => (
                  <div
                    key={goal}
                    className="relative border rounded-md p-3 flex cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{goal}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 h-5 w-5">
                        <input
                          type="radio"
                          name="primary-goal"
                          className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="target-audience" className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience
              </label>
              <textarea
                id="target-audience"
                rows={3}
                placeholder="Who is this video meant for? Describe your audience..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="reference-videos" className="block text-sm font-medium text-gray-700 mb-1">
                Reference Videos (Optional)
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Enter URLs of videos that inspire the style, tone, or approach you're looking for.
              </p>
              <textarea
                id="reference-videos"
                rows={3}
                placeholder="https://example.com/video1&#10;https://example.com/video2"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              ></textarea>
            </div>
          </div>
        )}
      </div>
      
      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={previousStep}
          disabled={currentStep === 0}
          className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
            currentStep === 0
              ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          }`}
        >
          <ArrowLeft className="mr-2 -ml-1 h-5 w-5" />
          Previous
        </button>
        
        <button
          type="button"
          onClick={nextStep}
          disabled={currentStep === 0 && !isStepComplete(0) || currentStep === 1 && !isStepComplete(1)}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            (currentStep === 0 && !isStepComplete(0)) || (currentStep === 1 && !isStepComplete(1))
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-black hover:bg-gray-900'
          }`}
        >
          {currentStep === steps.length - 1 ? (
            'Submit for Estimate'
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProjectWizard;