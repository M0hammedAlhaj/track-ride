import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordRequirement {
  text: string
  isValid: boolean
}

interface PasswordGuidelinesProps {
  password: string
  className?: string
}

export function PasswordGuidelines({ password, className }: PasswordGuidelinesProps) {
  const requirements: PasswordRequirement[] = [
    {
      text: 'على الأقل 8 أحرف',
      isValid: password.length >= 8
    },
    {
      text: 'حرف كبير واحد على الأقل (A-Z)',
      isValid: /[A-Z]/.test(password)
    },
    {
      text: 'حرف صغير واحد على الأقل (a-z)',
      isValid: /[a-z]/.test(password)
    },
    {
      text: 'رقم واحد على الأقل (0-9)',
      isValid: /\d/.test(password)
    },
    {
      text: 'رمز خاص واحد على الأقل (@$!%*?&)',
      isValid: /[@$!%*?&]/.test(password)
    }
  ]

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-gray-300 mb-3">متطلبات كلمة المرور:</p>
      <div className="space-y-1">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {requirement.isValid ? (
              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span className={cn(
              "transition-colors duration-200",
              requirement.isValid 
                ? "text-green-400" 
                : "text-gray-400"
            )}>
              {requirement.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface PasswordStrengthIndicatorProps {
  password: string
  className?: string
}

export function PasswordStrengthIndicator({ password, className }: PasswordStrengthIndicatorProps) {
  const getStrength = (password: string): { score: number; text: string; color: string } => {
    if (!password) return { score: 0, text: '', color: '' }
    
    let score = 0
    
    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1
    
    // Character type checks
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/\d/.test(password)) score += 1
    if (/[@$!%*?&]/.test(password)) score += 1
    
    if (score <= 2) return { score, text: 'ضعيفة', color: 'bg-red-500' }
    if (score <= 4) return { score, text: 'متوسطة', color: 'bg-yellow-500' }
    return { score, text: 'قوية', color: 'bg-green-500' }
  }

  const strength = getStrength(password)
  const maxScore = 6

  if (!password) return null

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">قوة كلمة المرور:</span>
        <span className={cn(
          "font-medium",
          strength.score <= 2 ? "text-red-400" : 
          strength.score <= 4 ? "text-yellow-400" : "text-green-400"
        )}>
          {strength.text}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={cn("h-2 rounded-full transition-all duration-300", strength.color)}
          style={{ width: `${(strength.score / maxScore) * 100}%` }}
        />
      </div>
    </div>
  )
}
