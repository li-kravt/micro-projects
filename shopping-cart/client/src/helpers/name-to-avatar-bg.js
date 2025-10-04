const VARIANTS = [
  'bg-red-100',
  'bg-orange-100',
  'bg-blue-100',
  'bg-cyan-100',
  'bg-green-100',
  'bg-amber-100',
  'bg-emerald-100',
  'bg-teal-100',
  'bg-sky-100',
  'bg-indigo-100',
  'bg-violet-100',
  'bg-pink-100',
  'bg-rose-100',
  'bg-fuchsia-100',
  'bg-slate-100',
  'bg-zinc-100',
  'bg-lime-100',
]
export const nameToAvatarBg = (name) => {
  const value = parseInt(name.replace(/\s/g, ''), 36)
  return VARIANTS[value % VARIANTS.length]
}
