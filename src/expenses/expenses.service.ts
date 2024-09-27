import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schema/expense.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    private readonly usersService: UsersService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, request) {
    const user = this.usersService.findOne(request.userId);
    if (!user) throw new NotFoundException();
    const newExpense = await this.expenseModel.create({
      ...createExpenseDto,
      userId: request.userId,
    });
    await this.usersService.addPost(request.userId, newExpense._id);
    return newExpense;
  }

  findAll() {
    return this.expenseModel.find();
  }

  findOne(id: number) {
    const expense = this.expenseModel.findById(id).populate('userId',"-expenses");
    if (!expense) throw new NotFoundException();
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = this.expenseModel.findById(id);
    if (!expense) throw new NotFoundException();
    const updatedUser = await this.expenseModel.findByIdAndUpdate(
      id,
      updateExpenseDto,
      { new: true },
    );
    return updatedUser;
  }

  async remove(id: number) {
    const expense = this.expenseModel.findById(id);
    if (!expense) throw new NotFoundException();
    const deletedExpense = await this.expenseModel.findByIdAndDelete(id);
    return deletedExpense;
  }
}
