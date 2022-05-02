export type BlockType = 'bullets' | 'code' | 'text';

export type Block = {
  type: BlockType
  language?: string
  value?: string
  blocks?: Block[]
};

export interface PostMessageDTO {
  groupId: string
  botName: string
  blocks: Block[]
}

export interface Auth {
  accessSecret: string
  accessKey: string
}