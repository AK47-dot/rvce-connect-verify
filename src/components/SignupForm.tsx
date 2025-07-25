import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Mail, User, Calendar, GraduationCap } from 'lucide-react';
import { validateEmail, calculateAllowedSemester, parseEmail } from '@/lib/validation';

interface SignupFormData {
  fullName: string;
  email: string;
  yearOfJoining: string;
  monthOfJoining: string;
  currentSemester: string;
  section: string;
  anonymous: boolean;
}

const MONTHS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const SECTIONS = ['A', 'B', 'C', 'D'];

export function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    yearOfJoining: '',
    monthOfJoining: '',
    currentSemester: '',
    section: '',
    anonymous: false,
  });

  const [errors, setErrors] = useState<Partial<SignupFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<SignupFormData> = {};

    // Email validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    // Year validation
    if (!formData.yearOfJoining) {
      newErrors.yearOfJoining = 'Year of joining is required';
    } else if (emailValidation.isValid && emailValidation.data) {
      const emailYear = parseInt(`20${emailValidation.data.year}`);
      const inputYear = parseInt(formData.yearOfJoining);
      if (emailYear !== inputYear) {
        newErrors.yearOfJoining = `Email indicates ${emailYear}, but you entered ${inputYear}`;
      }
    }

    // Semester validation
    if (!formData.currentSemester) {
      newErrors.currentSemester = 'Current semester is required';
    } else if (formData.yearOfJoining && formData.monthOfJoining) {
      const allowedSemester = calculateAllowedSemester(
        parseInt(formData.yearOfJoining),
        parseInt(formData.monthOfJoining)
      );
      const currentSem = parseInt(formData.currentSemester);
      if (currentSem > allowedSemester) {
        newErrors.currentSemester = `Maximum allowed semester is ${allowedSemester}`;
      }
    }

    // Other required fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.monthOfJoining) {
      newErrors.monthOfJoining = 'Month of joining is required';
    }

    if (!formData.section) {
      newErrors.section = 'Section is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - would redirect or show success message
      console.log('Signup successful:', formData);
      
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailValidation = validateEmail(formData.email);
  const parsedEmail = emailValidation.isValid ? emailValidation.data : null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Join RVCE Connect
        </CardTitle>
        <CardDescription className="text-base">
          Secure signup with college email verification
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
              className={errors.fullName ? 'border-destructive' : ''}
            />
            {errors.fullName && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="w-4 h-4" />
                {errors.fullName}
              </div>
            )}
          </div>

          {/* College Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              College Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="firstname+lastname.branchYY@rvce.edu.in"
              className={errors.email ? 'border-destructive' : emailValidation.isValid ? 'border-success' : ''}
            />
            {errors.email && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </div>
            )}
            {emailValidation.isValid && parsedEmail && (
              <div className="flex items-center gap-2 text-sm text-success">
                <CheckCircle2 className="w-4 h-4" />
                Detected: {parsedEmail.firstName} {parsedEmail.lastName}, {parsedEmail.branch.toUpperCase()}, 20{parsedEmail.year}
              </div>
            )}
          </div>

          {/* Year and Month of Joining */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearOfJoining" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Year of Joining
              </Label>
              <Input
                id="yearOfJoining"
                type="number"
                min="2020"
                max="2030"
                value={formData.yearOfJoining}
                onChange={(e) => setFormData({ ...formData, yearOfJoining: e.target.value })}
                placeholder="2024"
                className={errors.yearOfJoining ? 'border-destructive' : ''}
              />
              {errors.yearOfJoining && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {errors.yearOfJoining}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthOfJoining">Month of Joining</Label>
              <Select
                value={formData.monthOfJoining}
                onValueChange={(value) => setFormData({ ...formData, monthOfJoining: value })}
              >
                <SelectTrigger className={errors.monthOfJoining ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.monthOfJoining && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {errors.monthOfJoining}
                </div>
              )}
            </div>
          </div>

          {/* Current Semester and Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentSemester" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Current Semester
              </Label>
              <Select
                value={formData.currentSemester}
                onValueChange={(value) => setFormData({ ...formData, currentSemester: value })}
              >
                <SelectTrigger className={errors.currentSemester ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.currentSemester && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {errors.currentSemester}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Select
                value={formData.section}
                onValueChange={(value) => setFormData({ ...formData, section: value })}
              >
                <SelectTrigger className={errors.section ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {SECTIONS.map((section) => (
                    <SelectItem key={section} value={section}>
                      Section {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.section && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  {errors.section}
                </div>
              )}
            </div>
          </div>

          {/* Anonymous Mode */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={formData.anonymous}
              onCheckedChange={(checked) => setFormData({ ...formData, anonymous: checked as boolean })}
            />
            <Label htmlFor="anonymous" className="text-sm">
              Join as Anonymous (your identity will be hidden from other students)
            </Label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Join RVCE Connect'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
