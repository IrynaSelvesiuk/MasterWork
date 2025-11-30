import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { ConfigType } from '../../../config/env.config';

@Injectable()
export class HashService {
  private readonly saltRounds: number;

  constructor(private readonly configService: ConfigService<ConfigType>) {
    const salt = this.configService.get('hash.salt', { infer: true });
    if (salt === undefined) {
      throw new Error('Hash salt rounds configuration missing');
    }
    this.saltRounds = salt;
  }

  public async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }

  public async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
