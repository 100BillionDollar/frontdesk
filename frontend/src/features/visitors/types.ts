// Backend ke schemas/visitor.py (VisitorOut / VisitorCreate) se mirror kiya gaya
export interface Visitor {
  id: number
  name: string
  phone: string | null
  purpose: string | null
  checked_in_at: string
  checked_out_at: string | null
}

export interface VisitorCreate {
  name: string
  phone?: string | null
  purpose?: string | null
}
