export interface PdfToMapResponse {
  code: string;
  resumenes: string[];
  mapaConceptual: MapaConceptual;
  totalFragmentos: number;
}

export interface MapaConceptual {
  nodes: Node[];
  links: Link[];
}

export interface Link {
  source: string;
  target: string;
  label: string;
}

export interface Node {
  id: string;
  label: string;
}