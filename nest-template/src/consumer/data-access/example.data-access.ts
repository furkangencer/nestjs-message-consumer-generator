import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IExampleMessage } from '../interfaces';
import { Example, ExampleDocument } from '../schemas/example.schema';

@Injectable()
export class ExampleDataAccess {
  constructor(
    @InjectModel(Example.name) private exampleModel: Model<ExampleDocument>,
  ) {}

  async create(example: IExampleMessage) {
    return this.exampleModel.create(example);
  }

  async findAll() {
    return this.exampleModel.find();
  }

  async findOne(id: string) {
    return this.exampleModel.findById(id);
  }
}
