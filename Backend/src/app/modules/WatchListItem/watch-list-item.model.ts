import { model, Schema } from 'mongoose';
import { IWatchListItem } from './watch-list-item.interface';

const WatchListItemModelSchema = new Schema<IWatchListItem>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    campaign: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WatchListItem = model<IWatchListItem>('WatchListItem', WatchListItemModelSchema);

export default WatchListItem;
