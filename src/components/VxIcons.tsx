import React from 'react';
import { Bot, Gamepad2, Sparkles, MessageSquare, Zap, Target, Glasses, Layers, Box } from 'lucide-react';

export function VxAvatarIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-8 h-8 sm:w-10 sm:h-10',
  };

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center overflow-hidden border border-amber-500/30 bg-gradient-to-br from-amber-500/20 via-orange-600/20 to-purple-600/30 shadow-md shadow-amber-950/40 ${sizeClasses[size]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-purple-500/20 pointer-events-none" />
      <div className="relative flex items-center justify-center">
        <Bot className={`${iconSizes[size]} text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]`} />
        <Sparkles className="absolute -top-1 -right-1.5 w-2.5 h-2.5 text-amber-200 animate-pulse" />
      </div>
    </div>
  );
}

export function VxLeadsIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-8 h-8 sm:w-10 sm:h-10',
  };

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center overflow-hidden border border-blue-500/30 bg-gradient-to-br from-blue-500/20 via-cyan-600/20 to-indigo-600/30 shadow-md shadow-blue-950/40 ${sizeClasses[size]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/20 pointer-events-none" />
      <div className="relative flex items-center justify-center">
        <Gamepad2 className={`${iconSizes[size]} text-blue-400 drop-shadow-[0_2px_8px_rgba(59,130,246,0.5)]`} />
        <Target className="absolute -bottom-1 -right-1.5 w-2.5 h-2.5 text-cyan-300 opacity-80" />
      </div>
    </div>
  );
}

export function VxSalesIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-8 h-8 sm:w-10 sm:h-10',
  };

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-amber-600/20 to-orange-600/30 shadow-md shadow-orange-950/40 ${sizeClasses[size]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-amber-500/20 pointer-events-none" />
      <div className="relative flex items-center justify-center">
        <MessageSquare className={`${iconSizes[size]} text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]`} />
        <Zap className="absolute -top-1 -right-1 w-2.5 h-2.5 text-emerald-300" />
      </div>
    </div>
  );
}

export function VxVirtualIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-8 h-8 sm:w-10 sm:h-10',
  };

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center overflow-hidden border border-purple-500/30 bg-gradient-to-br from-purple-500/25 via-indigo-600/20 to-pink-600/30 shadow-md shadow-purple-950/40 ${sizeClasses[size]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/15 via-transparent to-pink-500/20 pointer-events-none" />
      <div className="relative flex items-center justify-center">
        <Glasses className={`${iconSizes[size]} text-purple-300 drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]`} />
        <Sparkles className="absolute -top-1 -right-1.5 w-2.5 h-2.5 text-pink-300 animate-pulse" />
      </div>
    </div>
  );
}
