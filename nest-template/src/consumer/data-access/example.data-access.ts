import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogMe } from '../../common/decorators';
import { IExampleMessage } from '../interfaces';
import { Example, ExampleDocument } from '../schemas';

@Injectable()
export class ExampleDataAccess {
  constructor(
    @InjectModel(Example.name) private exampleModel: Model<ExampleDocument>,
  ) {}

  @LogMe()
  async create(example: IExampleMessage) {
    return this.exampleModel.create(example);
  }

  @LogMe()
  async findAll() {
    return this.exampleModel.find();
  }

  @LogMe()
  async findOne(id: string) {
    return this.exampleModel.findById(id);
  }
}
