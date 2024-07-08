import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import RecordRepository from "../database/repositories/recordRepository";
import User from "../database/models/user";

export default class RecordServices {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await RecordRepository.create(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async createCombo(data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );
    const currentUser = MongooseRepository.getCurrentUser(this.options);
    const mergeDataPosition = currentUser.itemNumber;

    try {
      if (currentUser && currentUser.product && currentUser.product.length > 0 && currentUser.product[0].id && currentUser.tasksDone === mergeDataPosition) {

        if (Array.isArray(currentUser.product)) {
          for (const item of currentUser.product) {
            const number = await RecordRepository.Number();
            const values = {
              number,
              product: item.id,
              status: item?.status,
              user: currentUser.id,
            };
            await RecordRepository.createCombo(values, {
              ...this.options,
              session,
            });
            await User(this.options.database).updateOne(
              { _id: currentUser.id },
              {
                $set: {
                  tasksDone: currentUser.tasksDone + currentUser.product.length,
                },
              }
            );
          }
        }
      }
      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async updateCombo() {
    const session = await MongooseRepository.createSession(
      this.options.database
    );
    try {
      const record = await RecordRepository.updateCombo(this.options);
    
    
    return record;
    
    
    }
      catch(error){

        await MongooseRepository.abortTransaction(session);

        MongooseRepository.handleUniqueFieldError(
          error,
          this.options.language,
          "mandat"
        );
  
        throw error;
      }
      }


  async count() {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await RecordRepository.CountOrder({
        ...this.options,
        session,
      });
      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async countTasksDone(userId) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await RecordRepository.tasksDone(userId, {
        ...this.options,
        session,
      });
      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async check() {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await RecordRepository.checkOrder({
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await RecordRepository.update(id, data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      for (const id of ids) {
        await RecordRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return RecordRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return RecordRepository.findAllAutocomplete(search, limit, this.options);
  }

  async findAndCountAll(args) {
    return RecordRepository.findAndCountAll(args, this.options);
  }

  async findAndCountPerDay(args) {
    return RecordRepository.findAndCountPerDay(args, this.options);
  }
  async findAndCountAllMobile(args) {
    return RecordRepository.findAndCountAllMobile(args, this.options);
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashRequired"
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashExistent"
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await RecordRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}
