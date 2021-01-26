import {ConnectChannelRequestPayload, ConnectChannelRequestApiPayload} from '../payload';

export const connectChannelApiMapper = (payload: ConnectChannelRequestPayload): ConnectChannelRequestApiPayload => ({
  source: payload.source,
  source_channel_id: payload.sourceChannelId,
  token: payload.token,
  name: payload.name,
  image_url: payload.imageUrl,
});
