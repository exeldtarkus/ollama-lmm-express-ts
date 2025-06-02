import {Response} from 'express';
import {IMainRequest} from '../requests/main.request';
import {BaseResponse} from '../resources/base.response';
import {EHttpResponseStatus} from '../../enums/http.enum';
import {ISmartSearchRequestBody} from '../requests/smart.search.request';
import {OllamaService} from '../../services/ollama.service';
import {GoogleServices} from '../../services/google.service';
import env from '../../configs/env.config';
import {extractPlaceNames} from '../../utils/extract.namespace';

const smartSearch = async (
  req: IMainRequest<ISmartSearchRequestBody>,
  res: Response,
) => {
  const {prompt} = req.body;

  if (!prompt) {
    return BaseResponse.exec(res, {
      message: 'Prompt is required',
      status: EHttpResponseStatus.BadRequest,
      isSuccess: false,
    });
  }

  const searchQuery = await OllamaService.generatePrompt(prompt);

  const query = searchQuery?.response ? searchQuery.response.trim() : '';
  const namesPlaces = extractPlaceNames(query);

  const recommendations = await Promise.all(
    namesPlaces.slice(0, 5).map(async name => {
      const result = await GoogleServices.mapSearchPlace(name);
      const place = result?.results?.[0];

      if (!place) return null;

      return {
        name: place.name,
        address: place.formatted_address,
        mapEmbedUrl: `https://www.google.com/maps/embed/v1/place?key=${env.GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
          place.name + ' ' + place.formatted_address,
        )}`,
        directionsLink: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          place.formatted_address,
        )}`,
      };
    }),
  );

  const validResults = recommendations.filter(Boolean);

  return BaseResponse.exec(res, {
    data: {
      query: query,
      recommendations: {
        place: validResults,
      },
    },
    message: 'success',
    status: EHttpResponseStatus.Ok,
    isSuccess: true,
  });
};

export {smartSearch};
