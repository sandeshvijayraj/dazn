import { MongoClient, Db, Collection, Filter } from 'mongodb';
import { Movie } from 'src/interfaces/dataModels';

type DataObject = Movie;

export class MongoDB {
  private client: MongoClient;
  private db: Db | undefined;

  constructor() {
    this.client = new MongoClient('mongodb://my_mongo:27017/moviesdb');
    this.connect();
  }

  private async connect() {
    await this.client.connect();
    console.log('Connected to MongoDB');
    this.db = this.client.db();
  }

  public async findAll(
    collectionName: string,
    filter: Filter<DataObject>,
  ): Promise<Movie[]> {
    if (!this.db) {
      throw new Error('Not connected to MongoDB');
    }

    const collection: Collection<DataObject> =
      this.db.collection(collectionName);
    const cursor = collection.find<Movie>(filter);
    const result = await cursor.toArray();
    return result;
  }

  public async find(
    collectionName: string,
    filter: Filter<DataObject>,
  ): Promise<Movie | null> {
    if (!this.db) {
      throw new Error('Not connected to MongoDB');
    }
    const collection: Collection<DataObject> =
      this.db.collection(collectionName);
    const cursor = collection.findOne<Movie>(filter);
    const result = await cursor;
    return result;
  }

  public async update(collectionName: string, data: DataObject): Promise<void> {
    if (!this.db) {
      throw new Error('Not connected to MongoDB');
    }
    const collection: Collection<DataObject> =
      this.db.collection(collectionName);
    const filter: Filter<DataObject> = { id: data['id'] };
    await collection.updateOne(filter, { $set: data });
  }

  public async add(collectionName: string, data: DataObject): Promise<void> {
    if (!this.db) {
      throw new Error('Not connected to MongoDB');
    }
    const collection: Collection<DataObject> =
      this.db.collection(collectionName);
    await collection.insertOne(data);
  }

  public async delete(collectionName: string, filter: Filter<DataObject>) {
    if (!this.db) {
      throw new Error('Not connected to MongoDB');
    }
    const collection: Collection<DataObject> =
      this.db.collection(collectionName);
    await collection.deleteOne(filter);
  }

  public async closeConnection() {
    await this.client.close();
    console.log('MongoDB connection closed');
  }
}
