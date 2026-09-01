export interface Department {
  id: number
  title: string
  describe: string
}

export interface Member {
  department: number
  img: string
  name: string
  job: string
  email?: string
  website?: string
}

export const DEPARTMENTS: Department[] = [
  { id: 1, title: '會長、副會長', describe: '綜理本會會務，對外代表本會，並行使本會章程及會員大會賦予之其他職權。' },
  { id: 2, title: '會本部', describe: '負責處理學生會幕僚事務、籌備專案、活動及學生會對外公關事務，協助學生會整體事務順利運作。' },
  { id: 3, title: '學權部', describe: '負責統籌學生權益事務，了解學生對校園事務的意見，處理學生權益案件，並透過學權意見調查、學權救濟及學權知能傳遞等工作，完善學生權益之保障。' },
  { id: 4, title: '學術部', describe: '負責學生知能培力、講座辦理等，幫助學生提升學習便利性並促進學生間建立學習社群。' },
  { id: 5, title: '數位部', describe: '負責推動數位化業務，開發並維護校園數位服務平台，為全校學生提供數位服務，讓校園生活與學生會運作更有效率、更透明。' },
  { id: 6, title: '設計部', describe: '負責學生會各項形象視覺、募款品、影片之視覺、音效、動畫設計。' },
]

export const MEMBERS: Member[] = [
  // 正副會長
  { department: 1, img: '/member/super.jpg', name: '莊睿誠', job: '會長', email: '11430111@tschool.tp.edu.tw', website: 'https://www.instagram.com/super_1115_/' },
  { department: 1, img: '/member/default.png', name: '黃苡媞', job: '副會長', email: '', website: '' },
  // 會本部
  { department: 2, img: '/member/default.png', name: '陳宥彤', job: '秘書長', email: '', website: '' },
  { department: 2, img: '/member/kaba.jpg', name: '陸加恩', job: '發言人', email: '', website: 'https://youtu.be/hSYLrxjcG8c' },
  { department: 2, img: '/member/luketseng.jpg', name: '曾粲然', job: '部員', email: '', website: 'https://www.inaturalist.org/people/luketseng' },
  { department: 2, img: '/member/default.png', name: '蔡宜楨', job: '部員', email: '', website: '' },
  { department: 2, img: '/member/caleb.jpg', name: '王瀚澤', job: '部員', email: '', website: 'https://www.instagram.com/tschool_caleb/' },
  // 學權部
  { department: 3, img: '/member/default.png', name: '林楚凌', job: '部長', email: '', website: '' },
  { department: 3, img: '/member/default.png', name: '余光軒', job: '部員', email: '', website: '' },
  { department: 3, img: '/member/leialulu.jpg', name: '呂昕桓', job: '部員', email: '', website: 'https://youtu.be/dQw4w9WgXcQ' },
  // 學術部
  { department: 4, img: '/member/default.png', name: '陳昱璇', job: '部長', email: '', website: '' },
  { department: 4, img: '/member/default.png', name: '戴翊帆', job: '部員', email: '', website: '' },
  { department: 4, img: '/member/default.png', name: '徐涵英', job: '部員', email: '', website: '' },
  { department: 4, img: '/member/default.png', name: '陳亮妍', job: '部員', email: '', website: '' },
  // 數位部
  { department: 5, img: '/member/yushun.jpg', name: '陳友駿', job: '部長', email: '', website: '' },
  { department: 5, img: '/member/ray.png', name: '賴品叡', job: '部員', email: '', website: 'https://ray-tw.com/' },
  { department: 5, img: '/member/hailey.jpg', name: '張聿懷', job: '部員', email: '', website: 'https://www.instagram.com/100124hhh/' },
  { department: 5, img: '/member/lcy.jpg', name: '劉芷妤', job: '部員', email: '', website: '' },
  // 設計部
  { department: 6, img: '/member/default.png', name: '牟語棠', job: '部長', email: '', website: '' },
  { department: 6, img: '/member/default.png', name: '謝齊宣', job: '部員', email: '', website: '' },
]
