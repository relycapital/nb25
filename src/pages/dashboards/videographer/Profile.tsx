import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Link as LinkIcon, Award, Settings, Save, DollarSign, Ban as Bank } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    portfolio: 'https://portfolio.example.com',
    bankAccount: {
      accountName: 'John Smith',
      accountNumber: '****4567',
      routingNumber: '****1234',
      bankName: 'Chase Bank'
    },
    paymentHistory: [
      {
        date: '2025-03-15',
        amount: 2400.00,
        status: 'paid'
      },
      {
        date: '2025-03-01',
        amount: 1800.00,
        status: 'paid'
      }
    ],
    certifications: [
      'Certified Videographer',
      'Drone Pilot License',
      'Adobe Premiere Pro Certified'
    ],
    gear: [
      'Sony A7III',
      'DJI Ronin-S',
      'Canon C70',
      'DJI Mavic 3 Pro'
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to the backend
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="mt-1 text-gray-500">
          Manage your account information and payment settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-6">
                    <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
                    <p className="text-sm text-gray-500">Videographer</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {isEditing ? (
                    <span className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                      />
                    ) : (
                      <span>{profile.email}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                      />
                    ) : (
                      <span>{profile.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <LinkIcon className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="url"
                        value={profile.portfolio}
                        onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                      />
                    ) : (
                      <a
                        href={profile.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:underline"
                      >
                        {profile.portfolio}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Bank Account Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Bank className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="font-medium">{profile.bankAccount.bankName}</span>
                    </div>
                    {isEditing ? (
                      <button className="text-black hover:text-gray-700 text-sm">
                        Change Bank
                      </button>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Account Name:</span>
                      <span className="font-medium">{profile.bankAccount.accountName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Account Number:</span>
                      <span className="font-medium">{profile.bankAccount.accountNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Routing Number:</span>
                      <span className="font-medium">{profile.bankAccount.routingNumber}</span>
                    </div>
                  </div>
                </div>
                {!profile.bankAccount.accountNumber && (
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Bank className="mr-2 h-4 w-4" />
                    Add Bank Account
                  </button>
                )}
              </div>

              {/* Recent Payments */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Payments</h3>
                <div className="space-y-3">
                  {profile.paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                        <div>
                          <p className="font-medium">${payment.amount.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-green-600">Paid</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications and Equipment */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
              
              {/* Certifications */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Certifications</h4>
                <div className="space-y-3">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <Award className="h-5 w-5 text-gray-400 mr-3" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => {
                            const newCerts = [...profile.certifications];
                            newCerts[index] = e.target.value;
                            setProfile({ ...profile, certifications: newCerts });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                        />
                      ) : (
                        <span>{cert}</span>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => setProfile({
                        ...profile,
                        certifications: [...profile.certifications, '']
                      })}
                      className="text-sm text-black hover:underline"
                    >
                      + Add Certification
                    </button>
                  )}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Equipment</h4>
                <div className="space-y-3">
                  {profile.gear.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Camera className="h-5 w-5 text-gray-400 mr-3" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newGear = [...profile.gear];
                            newGear[index] = e.target.value;
                            setProfile({ ...profile, gear: newGear });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                        />
                      ) : (
                        <span>{item}</span>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => setProfile({
                        ...profile,
                        gear: [...profile.gear, '']
                      })}
                      className="text-sm text-black hover:underline"
                    >
                      + Add Equipment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Notification Preferences
                </button>
                <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Privacy Settings
                </button>
                <button className="w-full text-left px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50">
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Storage Usage */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Storage Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Used Storage</span>
                    <span className="font-medium">245.8 GB / 500 GB</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-black rounded-full" style={{ width: '49%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Bandwidth</span>
                    <span className="font-medium">890.2 GB / 1 TB</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-black rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                <button className="w-full text-center px-4 py-2 border border-black rounded-md text-sm font-medium text-black hover:bg-gray-50">
                  Upgrade Storage Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;