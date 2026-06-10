/**
 * Resolves a Lucide icon name (stored as a string in Sanity) to its
 * React component. Add new icons here as schemas reference them.
 */
import {
  Activity, Award, Building2, Camera, CheckCircle, CheckCircle2, ChevronDown,
  Clock, Cloud, Cpu, Eye, Factory, Film, GitMerge, Globe, HardDrive, Heart,
  Layers, Lightbulb, Lock, Mail, MapPin, Network, PenTool, Phone, Quote,
  Radio, Rocket, Search, Server, Shield, ShieldCheck, ShoppingBag, Sparkles,
  Target, TrendingUp, Truck, Users, Zap,
  ArrowRight, ArrowUpRight, Send, type LucideIcon,
} from "lucide-react";

const REGISTRY: Record<string, LucideIcon> = {
  Activity, Award, Building2, Camera, CheckCircle, CheckCircle2, ChevronDown,
  Clock, Cloud, Cpu, Eye, Factory, Film, GitMerge, Globe, HardDrive, Heart,
  Layers, Lightbulb, Lock, Mail, MapPin, Network, PenTool, Phone, Quote,
  Radio, Rocket, Search, Server, Shield, ShieldCheck, ShoppingBag, Sparkles,
  Target, TrendingUp, Truck, Users, Zap,
  ArrowRight, ArrowUpRight, Send,
};

export function iconFor(name: string | undefined, fallback: LucideIcon = Sparkles): LucideIcon {
  if (!name) return fallback;
  return REGISTRY[name] ?? fallback;
}
