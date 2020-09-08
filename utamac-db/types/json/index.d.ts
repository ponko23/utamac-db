export interface Plate {
  id: string
  uri: string
  name: string
  rality: number[]
  attribute: string
  series: string
  image: string[]
  episode: string
  centerSkill: Skill[][]
  activeSkill: Skill[][]
  liveSkill: Skill[][]
  compatibleDiva: string[]
  status: PlateStatus[]
  lastUpdated: string
}

export interface Skill {
  name: string
  rank: string
  effect: string
  conditions: string
}

export interface PlateStatus {
  total: number
  soul: number
  voice: number
  charm: number
  life: number
  suport: number
  foldWave: number
  luck: number
}

export interface ScrapeData<T> {
  url: string
  data: T
  lastUpdated: string
}

export interface Diva {
  id: string
  uri: string
  icon: string
  name: string
  series: string
  image: string
  color: string
  initialTotal: number
  initialSoul: number
  initialVoice: number
  initialCharm: number
  maxTotal: number
  maxSoul: number
  maxVoice: number
  maxCharm: number
  initialLife: number
  initialSuport: number
  initialFoldWave: number
  maxLife: number
  maxSuport: number
  maxFoldWave: number
  lastUpdated: string
}

export interface Costume {
  id: string
  uri: string
  name: string
  diva: string
  effect: string
  howToGet: string
  image: string
  lastUpdated: string
}

declare module '*/plates.json' {
  const value: ScrapeData<Plate[]>
  export = value
}

declare module '*/divas/json' {
  const value: ScrapeData<Diva[]>
  export = value
}

declare module '*/costumes.json' {
  const value: ScrapeData<Costume[]>
  export = value
}
