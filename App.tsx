import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Upload,
  ArrowLeft,
  Users,
  BookOpen,
  FileText,
  Save,
  Send
} from 'lucide-react';

interface SubjectInstructorPair {
  id: string;
  subject: string;
  instructor: string;
}

interface SemesterData {
  [key: string]: SubjectInstructorPair[];
}

const CATEGORIES = [
  'School (Classes 4–12)',
  'College',
  'Entrance Exam',
  'Government Exams',
  'UPSC',
  'Skill Development Programs'
];

const CLASS_LEVELS = ['4', '5', '6', '7', '8', '9', '10', '11', '12'];
const SYLLABI = ['State', 'CBSE', 'ICSE'];
const SCHOOL_SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science'];
const UNIVERSITIES = ['Delhi University', 'Mumbai University', 'Bangalore University', 'Pune University'];
const STREAMS = ['Science', 'Commerce', 'Arts', 'Engineering', 'Medical'];
const EDUCATION_LEVELS = ['UG', 'PG'];
const ENTRANCE_EXAMS = ['NEET', 'JEE Main', 'JEE Advanced', 'CLAT', 'CAT', 'XAT'];
const GOVERNMENT_EXAMS = ['SSC CGL', 'SSC CHSL', 'RRB NTPC', 'RRB JE', 'PSC', 'Bank PO', 'Bank Clerk'];
const EXAM_PHASES = ['Prelims', 'Mains', 'Interview'];
const UPSC_SUBJECTS = ['General Studies Paper 1', 'General Studies Paper 2', 'General Studies Paper 3', 'General Studies Paper 4', 'Optional Subject - History', 'Optional Subject - Geography', 'Optional Subject - Political Science', 'Essay'];
const SKILL_AREAS = ['Information Technology', 'Digital Marketing', 'Graphic Design', 'Web Development', 'Data Science', 'Language Learning', 'Communication Skills'];
const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// Enhanced instructor data with subjects and categories
const INSTRUCTORS_DATA = {
  'Mathematics': {
    'School (Classes 4–12)': ['Dr. Rajesh Kumar', 'Prof. Priya Sharma', 'Ms. Anita Singh'],
    'College': ['Dr. Vikram Patel', 'Prof. Meera Joshi', 'Dr. Arjun Reddy'],
    'Entrance Exam': ['Dr. Suresh Gupta', 'Prof. Kavita Nair', 'Ms. Deepika Rao'],
    'Government Exams': ['Dr. Amit Verma', 'Prof. Sunita Das'],
    'UPSC': ['Dr. Rajiv Khanna', 'Prof. Sushma Iyer'],
    'Skill Development Programs': ['Mr. Rohit Agarwal', 'Ms. Neha Kapoor']
  },
  'Physics': {
    'School (Classes 4–12)': ['Dr. Ashok Mehta', 'Prof. Ritu Bansal', 'Ms. Pooja Jain'],
    'College': ['Dr. Sanjay Kulkarni', 'Prof. Lakshmi Pillai', 'Dr. Manoj Tiwari'],
    'Entrance Exam': ['Dr. Ramesh Agarwal', 'Prof. Shilpa Desai', 'Ms. Rekha Sood'],
    'Government Exams': ['Dr. Vinod Sharma', 'Prof. Geeta Rani'],
    'UPSC': ['Dr. Prakash Jha', 'Prof. Vandana Singh']
  },
  'Chemistry': {
    'School (Classes 4–12)': ['Dr. Mohan Lal', 'Prof. Seema Gupta', 'Ms. Rashmi Patel'],
    'College': ['Dr. Kiran Kumar', 'Prof. Nisha Agarwal', 'Dr. Sunil Yadav'],
    'Entrance Exam': ['Dr. Harish Chandra', 'Prof. Madhuri Joshi', 'Ms. Swati Sharma'],
    'Government Exams': ['Dr. Ravi Shankar', 'Prof. Usha Devi'],
    'UPSC': ['Dr. Dinesh Gupta', 'Prof. Kamala Das']
  },
  'Biology': {
    'School (Classes 4–12)': ['Dr. Sunita Rao', 'Prof. Vijay Kumar', 'Ms. Priyanka Singh'],
    'College': ['Dr. Anil Sharma', 'Prof. Radha Krishna', 'Dr. Mukesh Patel'],
    'Entrance Exam': ['Dr. Gopal Reddy', 'Prof. Savita Jain', 'Ms. Nidhi Agarwal'],
    'Government Exams': ['Dr. Mahesh Gupta', 'Prof. Lata Sharma'],
    'UPSC': ['Dr. Sudhir Kumar', 'Prof. Bharti Singh']
  },
  'English': {
    'School (Classes 4–12)': ['Ms. Sarah Johnson', 'Prof. David Wilson', 'Ms. Emily Davis'],
    'College': ['Dr. Michael Brown', 'Prof. Jennifer Taylor', 'Dr. Robert Miller'],
    'Entrance Exam': ['Dr. James Anderson', 'Prof. Lisa Thompson', 'Ms. Maria Garcia'],
    'Government Exams': ['Dr. William Jones', 'Prof. Patricia Wilson'],
    'UPSC': ['Dr. Richard Davis', 'Prof. Linda Johnson'],
    'Skill Development Programs': ['Ms. Jessica Smith', 'Mr. Christopher Lee']
  },
  'History': {
    'School (Classes 4–12)': ['Dr. Ramesh Chandra', 'Prof. Sushila Devi', 'Ms. Kavita Sharma'],
    'College': ['Dr. Narayan Singh', 'Prof. Pushpa Joshi', 'Dr. Balram Yadav'],
    'Government Exams': ['Dr. Jagdish Prasad', 'Prof. Kamla Devi'],
    'UPSC': ['Dr. Hari Om Shastri', 'Prof. Saraswati Pandey', 'Dr. Bharat Bhushan']
  },
  'Geography': {
    'School (Classes 4–12)': ['Dr. Suresh Kumar', 'Prof. Meena Sharma', 'Ms. Renu Gupta'],
    'College': ['Dr. Rajesh Tiwari', 'Prof. Sunita Rani', 'Dr. Mohan Singh'],
    'Government Exams': ['Dr. Ashok Kumar', 'Prof. Shanti Devi'],
    'UPSC': ['Dr. Brij Mohan', 'Prof. Urmila Sharma', 'Dr. Ganga Ram']
  },
  'Computer Science': {
    'School (Classes 4–12)': ['Mr. Arjun Patel', 'Ms. Sneha Reddy', 'Mr. Karthik Nair'],
    'College': ['Dr. Rajesh Kumar', 'Prof. Priya Sharma', 'Dr. Vikash Singh'],
    'Entrance Exam': ['Dr. Sunil Agarwal', 'Prof. Nisha Jain', 'Ms. Pooja Gupta'],
    'Skill Development Programs': ['Mr. Rohit Sharma', 'Ms. Anjali Patel', 'Mr. Deepak Kumar']
  }
};

// UPSC specific subjects with instructors
const UPSC_INSTRUCTORS_DATA = {
  'General Studies Paper 1': ['Dr. Rajiv Ahir', 'Prof. Mrunal Patel', 'Dr. Roman Saini'],
  'General Studies Paper 2': ['Dr. Ashish Arora', 'Prof. Sriram Rajagopalan', 'Ms. Neha Agarwal'],
  'General Studies Paper 3': ['Dr. Vivek Singh', 'Prof. Ajay Kumar Mishra', 'Dr. Piyush Chaubey'],
  'General Studies Paper 4': ['Dr. Awdhesh Singh', 'Prof. Vikas Ranjan', 'Ms. Tina Dabi'],
  'Optional Subject - History': ['Dr. Hari Om Shastri', 'Prof. Saraswati Pandey', 'Dr. Bharat Bhushan'],
  'Optional Subject - Geography': ['Dr. Brij Mohan', 'Prof. Urmila Sharma', 'Dr. Ganga Ram'],
  'Optional Subject - Political Science': ['Dr. Shubhra Ranjan', 'Prof. Vidya Bhushan', 'Dr. Laxmikanth M'],
  'Essay': ['Dr. Pulkit Sharma', 'Prof. Drishti Gautam', 'Ms. Aparna Dixit']
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    duration: '',
    price: '',
    status: 'Active',
    thumbnailUrl: '',
    bannerUrl: '',
    // School specific
    classLevel: '',
    syllabus: '',
    selectedSubjects: [] as string[],
    subjectInstructorPairs: [] as SubjectInstructorPair[],
    // College specific
    university: '',
    stream: '',
    educationLevel: '',
    semesterData: {} as SemesterData,
    // Entrance/Government specific
    examType: '',
    examName: '',
    examPhase: '',
    // UPSC specific
    syllabusFile: null as File | null,
    // Skill Development specific
    skillArea: '',
    courseLevel: ''
  });

  const [expandedSemesters, setExpandedSemesters] = useState<Set<string>>(new Set());

  // Function to get filtered instructors based on subject and category
  const getFilteredInstructors = (subject: string, category: string = selectedCategory): string[] => {
    if (category === 'UPSC' && UPSC_INSTRUCTORS_DATA[subject]) {
      return UPSC_INSTRUCTORS_DATA[subject];
    }
    
    if (INSTRUCTORS_DATA[subject] && INSTRUCTORS_DATA[subject][category]) {
      return INSTRUCTORS_DATA[subject][category];
    }
    
    return [];
  };

  const addSubjectInstructorPair = () => {
    const newPair: SubjectInstructorPair = {
      id: Date.now().toString(),
      subject: '',
      instructor: ''
    };
    setFormData(prev => ({
      ...prev,
      subjectInstructorPairs: [...prev.subjectInstructorPairs, newPair]
    }));
  };

  const removeSubjectInstructorPair = (id: string) => {
    setFormData(prev => ({
      ...prev,
      subjectInstructorPairs: prev.subjectInstructorPairs.filter(pair => pair.id !== id)
    }));
  };

  const updateSubjectInstructorPair = (id: string, field: 'subject' | 'instructor', value: string) => {
    setFormData(prev => ({
      ...prev,
      subjectInstructorPairs: prev.subjectInstructorPairs.map(pair =>
        pair.id === id ? { ...pair, [field]: value } : pair
      )
    }));
  };

  const toggleSemester = (semester: string) => {
    const newExpanded = new Set(expandedSemesters);
    if (newExpanded.has(semester)) {
      newExpanded.delete(semester);
    } else {
      newExpanded.add(semester);
    }
    setExpandedSemesters(newExpanded);
  };

  const addSemesterSubject = (semester: string) => {
    const newPair: SubjectInstructorPair = {
      id: Date.now().toString(),
      subject: '',
      instructor: ''
    };
    setFormData(prev => ({
      ...prev,
      semesterData: {
        ...prev.semesterData,
        [semester]: [...(prev.semesterData[semester] || []), newPair]
      }
    }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Reset category-specific fields
    setFormData(prev => ({
      ...prev,
      classLevel: '',
      syllabus: '',
      selectedSubjects: [],
      subjectInstructorPairs: [],
      university: '',
      stream: '',
      educationLevel: '',
      semesterData: {},
      examType: '',
      examName: '',
      examPhase: '',
      syllabusFile: null,
      skillArea: '',
      courseLevel: ''
    }));
    setExpandedSemesters(new Set());
  };

  const renderCategorySpecificFields = () => {
    if (!selectedCategory) return null;

    const renderWithAnimation = (content: React.ReactNode) => (
      <div className="animate-slideDown">
        <div className="bg-gray-50 rounded-lg p-6 mt-6 border border-gray-200">
          {content}
        </div>
      </div>
    );

    switch (selectedCategory) {
      case 'School (Classes 4–12)':
        return renderWithAnimation(
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">School Course Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Level *
                </label>
                <select
                  value={formData.classLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, classLevel: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Class</option>
                  {CLASS_LEVELS.map(level => (
                    <option key={level} value={level}>Class {level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Syllabus *
                </label>
                <select
                  value={formData.syllabus}
                  onChange={(e) => setFormData(prev => ({ ...prev, syllabus: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Syllabus</option>
                  {SYLLABI.map(syllabus => (
                    <option key={syllabus} value={syllabus}>{syllabus}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject & Instructor Mapping *
              </label>
              <div className="space-y-3">
                {formData.subjectInstructorPairs.map((pair) => (
                  <div key={pair.id} className="flex gap-3 items-center p-4 bg-white border border-gray-200 rounded-lg">
                    <select
                      value={pair.subject}
                      onChange={(e) => updateSubjectInstructorPair(pair.id, 'subject', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select Subject</option>
                      {SCHOOL_SUBJECTS.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    <select
                      value={pair.instructor}
                      onChange={(e) => updateSubjectInstructorPair(pair.id, 'instructor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     disabled={!pair.subject}
                    >
                      <option value="">Select Instructor</option>
                      {pair.subject && getFilteredInstructors(pair.subject).map(instructor => (
                        <option key={instructor} value={instructor}>{instructor}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeSubjectInstructorPair(pair.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addSubjectInstructorPair}
                  className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 border border-purple-200 rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Add Subject-Instructor Pair
                </button>
              </div>
            </div>
          </div>
        );

      case 'College':
        return renderWithAnimation(
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">College Course Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University *
                </label>
                <select
                  value={formData.university}
                  onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select University</option>
                  {UNIVERSITIES.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stream *
                </label>
                <select
                  value={formData.stream}
                  onChange={(e) => setFormData(prev => ({ ...prev, stream: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Stream</option>
                  {STREAMS.map(stream => (
                    <option key={stream} value={stream}>{stream}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level *
                </label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, educationLevel: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Level</option>
                  {EDUCATION_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Semester-wise Subject & Instructor Mapping
              </label>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <div key={sem} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleSemester(`semester${sem}`)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 rounded-t-lg transition-colors"
                    >
                      <span className="font-medium">Semester {sem}</span>
                      {expandedSemesters.has(`semester${sem}`) ? 
                        <ChevronUp size={16} /> : <ChevronDown size={16} />
                      }
                    </button>
                    {expandedSemesters.has(`semester${sem}`) && (
                      <div className="p-4 space-y-3 border-t border-gray-200">
                        {(formData.semesterData[`semester${sem}`] || []).map((pair) => (
                          <div key={pair.id} className="flex gap-3 items-center">
                            <select
                              value={pair.subject}
                              onChange={(e) => {
                                const newSemesterData = { ...formData.semesterData };
                                newSemesterData[`semester${sem}`] = newSemesterData[`semester${sem}`].map(p =>
                                  p.id === pair.id ? { ...p, subject: e.target.value } : p
                                );
                                setFormData(prev => ({ ...prev, semesterData: newSemesterData }));
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="">Select Subject</option>
                              {SCHOOL_SUBJECTS.map(subject => (
                                <option key={subject} value={subject}>{subject}</option>
                              ))}
                            </select>
                            <select
                              value={pair.instructor}
                              onChange={(e) => {
                                const newSemesterData = { ...formData.semesterData };
                                newSemesterData[`semester${sem}`] = newSemesterData[`semester${sem}`].map(p =>
                                  p.id === pair.id ? { ...p, instructor: e.target.value } : p
                                );
                                setFormData(prev => ({ ...prev, semesterData: newSemesterData }));
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                             disabled={!pair.subject}
                            >
                              <option value="">Select Instructor</option>
                              {pair.subject && getFilteredInstructors(pair.subject).map(instructor => (
                                <option key={instructor} value={instructor}>{instructor}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                        <button
                          onClick={() => addSemesterSubject(`semester${sem}`)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 border border-purple-200 rounded-md transition-colors"
                        >
                          <Plus size={14} />
                          Add Subject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Entrance Exam':
        return renderWithAnimation(
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Entrance Exam Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Type *
                </label>
                <select
                  value={formData.examType}
                  onChange={(e) => setFormData(prev => ({ ...prev, examType: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Exam Type</option>
                  {ENTRANCE_EXAMS.map(exam => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Selection *
                </label>
                <select
                  multiple
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                >
                  {SCHOOL_SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple subjects</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor Assignment *
              </label>
              <select
                multiple
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
              >
                {INSTRUCTORS.map(instructor => (
                  <option key={instructor} value={instructor}>{instructor}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple instructors</p>
            </div>
          </div>
        );

      case 'Government Exams':
        return renderWithAnimation(
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Government Exam Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Name *
                </label>
                <select
                  value={formData.examName}
                  onChange={(e) => setFormData(prev => ({ ...prev, examName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Exam</option>
                  {GOVERNMENT_EXAMS.map(exam => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Phase *
                </label>
                <select
                  value={formData.examPhase}
                  onChange={(e) => setFormData(prev => ({ ...prev, examPhase: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Phase</option>
                  {EXAM_PHASES.map(phase => (
                    <option key={phase} value={phase}>{phase}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Selection *
                </label>
                <select
                  multiple
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                >
                  {SCHOOL_SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple subjects</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructor Assignment *
                </label>
                <select
                  multiple
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                >
                  {INSTRUCTORS.map(instructor => (
                    <option key={instructor} value={instructor}>{instructor}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple instructors</p>
              </div>
            </div>
          </div>
        );

      case 'UPSC':
        return renderWithAnimation(
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">UPSC Course Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Phase *
                </label>
                <select
                  value={formData.examPhase}
                  onChange={(e) => setFormData(prev => ({ ...prev, examPhase: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Phase</option>
                  {EXAM_PHASES.map(phase => (
                    <option key={phase} value={phase}>{phase}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Selection *
                </label>
                <select
                  multiple
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                >
                  {UPSC_SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple subjects</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor Assignment *
              </label>
              <select
                multiple
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
              >
                {INSTRUCTORS.map(instructor => (
                  <option key={instructor} value={instructor}>{instructor}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple instructors</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Syllabus PDF (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF files only, max 10MB</p>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFormData(prev => ({ ...prev, syllabusFile: e.target.files![0] }));
                    }
                  }}
                />
              </div>
              {formData.syllabusFile && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {formData.syllabusFile.name} uploaded
                </p>
              )}
            </div>
          </div>
        );

      case 'Skill Development Programs':
        return renderWithAnimation(
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Development Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Area *
                </label>
                <select
                  value={formData.skillArea}
                  onChange={(e) => setFormData(prev => ({ ...prev, skillArea: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Skill Area</option>
                  {SKILL_AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Level *
                </label>
                <select
                  value={formData.courseLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseLevel: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Level</option>
                  {COURSE_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic Selection *
                </label>
                <select
                  multiple
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                >
                  {SCHOOL_SUBJECTS.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple topics</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructor Assignment *
                </label>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Select topics first to see available instructors</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">
                      Instructors will be automatically filtered based on your topic selections above.
                      Each topic will show only qualified instructors for Skill Development Programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EA</span>
            </div>
            <span className="font-semibold text-gray-900">EduAdmin</span>
          </div>
          
          <nav className="space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <BookOpen size={20} />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg">
              <BookOpen size={20} />
              <span>Course Management</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Users size={20} />
              <span>Student Management</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Users size={20} />
              <span>Instructor Management</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <FileText size={20} />
              <span>Payments & Transactions</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <FileText size={20} />
              <span>Announcements</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <FileText size={20} />
              <span>Support Tickets</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <FileText size={20} />
              <span>Settings</span>
            </div>
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 w-64 p-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">admin@eduplatform.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Add New Course</h1>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                  <ArrowLeft size={16} />
                  Back to Courses
                </button>
              </div>
              <p className="text-gray-600">Create a comprehensive course with content and assessments</p>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-8 mt-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
              <FileText size={16} />
              Course Info
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700">
              <BookOpen size={16} />
              Content
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700">
              <Save size={16} />
              Drafts
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 py-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-8">Basic Course Information</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Complete NEET Preparation"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Physics, Chemistry & Biology for NEET 2024"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  placeholder="Detailed course description..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 12 months"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Dynamic Category-Specific Fields */}
              {renderCategorySpecificFields()}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent max-w-xs"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/thumbnail.jpg"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {formData.thumbnailUrl && (
                    <div className="mt-3">
                      <img
                        src={formData.thumbnailUrl}
                        alt="Thumbnail preview"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/banner.jpg"
                    value={formData.bannerUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, bannerUrl: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {formData.bannerUrl && (
                    <div className="mt-3">
                      <img
                        src={formData.bannerUrl}
                        alt="Banner preview"
                        className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Save as Draft
              </button>
              <button className="flex items-center gap-2 px-6 py-3 text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                <Users size={16} />
                Assign Course to Instructors
              </button>
              <button className="flex items-center gap-2 px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                <Send size={16} />
                Create Course with Content & Tests
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;