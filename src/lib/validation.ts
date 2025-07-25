interface ParsedEmail {
  firstName: string;
  lastName: string;
  branch: string;
  year: string;
}

interface EmailValidationResult {
  isValid: boolean;
  data?: ParsedEmail;
  error?: string;
}

export function validateEmail(email: string): EmailValidationResult {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  // Check if email ends with @rvce.edu.in
  if (!email.endsWith('@rvce.edu.in')) {
    return { isValid: false, error: 'Email must be from @rvce.edu.in domain' };
  }

  // Extract the local part (before @)
  const localPart = email.split('@')[0];
  
  // Updated regex to handle + or . as separators
  const emailRegex = /^([a-z]+)[+.]([a-z]+)\.([a-z]{2,3})(\d{2})$/i;
  const match = localPart.match(emailRegex);

  if (!match) {
    return { 
      isValid: false, 
      error: 'Invalid email format. Expected: firstname+lastname.branchYY@rvce.edu.in' 
    };
  }

  const [, firstName, lastName, branch, year] = match;

  // Validate branch codes (common RVCE branches)
  const validBranches = ['me', 'cse', 'ece', 'eee', 'cv', 'ch', 'bt', 'ie', 'ise', 'te', 'ai', 'cs'];
  if (!validBranches.includes(branch.toLowerCase())) {
    return { 
      isValid: false, 
      error: `Invalid branch code: ${branch}. Valid branches: ${validBranches.join(', ')}` 
    };
  }

  // Validate year (should be reasonable)
  const yearNum = parseInt(year);
  const currentYear = new Date().getFullYear();
  const twoDigitCurrentYear = currentYear % 100;
  
  // Allow years from 5 years ago to 2 years in the future
  if (yearNum < (twoDigitCurrentYear - 5) || yearNum > (twoDigitCurrentYear + 2)) {
    return { 
      isValid: false, 
      error: `Invalid year: 20${year}` 
    };
  }

  return {
    isValid: true,
    data: {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      branch: branch.toLowerCase(),
      year
    }
  };
}

export function parseEmail(email: string): ParsedEmail | null {
  const validation = validateEmail(email);
  return validation.isValid ? validation.data! : null;
}

export function calculateAllowedSemester(yearOfJoining: number, monthOfJoining: number): number {
  const currentDate = new Date();
  const joinDate = new Date(yearOfJoining, monthOfJoining - 1); // JavaScript months are 0-indexed
  
  const monthsDiff = (currentDate.getFullYear() - joinDate.getFullYear()) * 12 + 
                     (currentDate.getMonth() - joinDate.getMonth());
  
  // Each semester is 6 months
  const allowedSemester = Math.floor(monthsDiff / 6) + 1;
  
  // Cap at semester 8
  return Math.min(allowedSemester, 8);
}

export function validateSemesterEligibility(
  currentSemester: number, 
  yearOfJoining: number, 
  monthOfJoining: number
): { isValid: boolean; maxAllowed: number; error?: string } {
  const maxAllowed = calculateAllowedSemester(yearOfJoining, monthOfJoining);
  
  if (currentSemester > maxAllowed) {
    return {
      isValid: false,
      maxAllowed,
      error: `You can only be in semester ${maxAllowed} or lower based on your joining date`
    };
  }
  
  return {
    isValid: true,
    maxAllowed
  };
}