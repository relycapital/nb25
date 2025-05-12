import React from 'react';
import { BookOpen, CheckCircle, FileText } from 'lucide-react';

const Guidelines = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Videographer Guidelines</h1>
        <p className="mt-2 text-gray-600">Essential information to ensure high-quality video production</p>
      </div>

      <div className="space-y-6">
        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">General Requirements</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Maintain professional equipment standards and ensure all gear is properly calibrated</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Follow project-specific shooting guidelines and requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Ensure proper lighting and sound quality for all recordings</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Technical Specifications</h2>
          </div>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium text-gray-800 mb-2">Video Format</h3>
              <p className="text-gray-600">4K (3840x2160) or 1080p (1920x1080) resolution at 24fps or 30fps</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium text-gray-800 mb-2">Audio Requirements</h3>
              <p className="text-gray-600">48kHz sample rate, recorded at -12dB to -6dB peak levels</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">File Delivery</h3>
              <p className="text-gray-600">H.264/H.265 codec, with separate WAV audio files when required</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Best Practices</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Pre-Production</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Review project brief thoroughly</li>
                <li>• Check all equipment before shooting</li>
                <li>• Scout locations when possible</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Post-Production</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Backup footage immediately</li>
                <li>• Follow naming conventions</li>
                <li>• Submit test clips for approval</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guidelines;