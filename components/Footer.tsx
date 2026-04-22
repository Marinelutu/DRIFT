import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A18] text-[#F5F0EB] py-20 px-8 font-[family-name:var(--font-body)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Col 1 */}
        <div>
          <h2 className="text-[1.8rem] font-[family-name:var(--font-display)] italic mb-2">DRIFT</h2>
          <p className="text-[13px] text-[#9A9189]">Wear the Moment.</p>
        </div>

        {/* Col 2 */}
        <div>
          <h3 className="text-[11px] uppercase tracking-widest text-[#C4622D] mb-6">Shop</h3>
          <ul className="space-y-4 text-[14px] text-[#F5F0EB]/60">
            <li><Link href="#" className="hover:text-white transition-colors">Collections</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Lookbook</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">New In</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Sale</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h3 className="text-[11px] uppercase tracking-widest text-[#C4622D] mb-6">Company</h3>
          <ul className="space-y-4 text-[14px] text-[#F5F0EB]/60">
            <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h3 className="text-[11px] uppercase tracking-widest text-[#C4622D] mb-6">Follow</h3>
          <ul className="space-y-4 text-[14px] text-[#F5F0EB]/60">
            <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">TikTok</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Pinterest</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-[#F5F0EB]/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[12px] text-[#F5F0EB]/35">
        <p>© 2025 DRIFT. All rights reserved.</p>
        <p className="italic">Wear the Moment.</p>
      </div>
    </footer>
  )
}
