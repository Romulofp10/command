/** Opção de customização (ex.: borda, ingrediente extra) */
export interface CustomizacaoOpcao {
  id: string
  nome: string
  preco?: number
  /** Para seleção única: selecionado. Para múltipla: quantidade */
  quantidade?: number
  selected?: boolean
}

/** Grupo de customização (ex.: BORDA RECHEADA, INGREDIENTES EXTRAS) */
export interface CustomizacaoGrupo {
  id: string
  titulo: string
  tipo: 'single' | 'multiple'
  obrigatorio?: boolean
  itens: CustomizacaoOpcao[]
}

export interface Product {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem?: string
  customizavel: boolean
  /** Só presente quando customizavel === true */
  customizacoes?: CustomizacaoGrupo[]
}
