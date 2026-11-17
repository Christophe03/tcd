import { Shell } from '@/components/Shell'
import { BranchesSection } from '@/components/sections/BranchesSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { LeavesSection } from '@/components/sections/LeavesSection'
import { RootsSection } from '@/components/sections/RootsSection'
import { SkyContact } from '@/components/sections/SkyContact'
import { TrunkSection } from '@/components/sections/TrunkSection'

export default function Page() {
  return (
    <Shell>
      <HeroSection />
      <RootsSection />
      <TrunkSection />
      <BranchesSection />
      <LeavesSection />
      <SkyContact />
    </Shell>
  )
}
