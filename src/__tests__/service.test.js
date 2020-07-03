import * as api from '../api/service';
import mockSearchVideo from '../__mocks__/mockSearchVideo';
import mockGetVideoInfo from '../__mocks__/mockGetVideoInfo';
import mockGetVideoComments from '../__mocks__/mockGetVideoComments';

describe('Implementação módulo de acesso à API do Youtube', () => {
  test('searchVideos', () => {
    const searchText = 'bugs';

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockSearchVideo),
      })
    );

    return api.searchVideos(searchText).then((videos) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /https:\/\/www.googleapis.com\/youtube\/v3\/search/
        )
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(searchText)
      );
      expect(videos).toStrictEqual(mockSearchVideo);
    });
  });

  test('searchVideos testando o reject', async () => {
    const searchText = 'bugs';

    jest.spyOn(global, 'fetch').mockRejectedValue({
      error: 'Deu ruim no fetch',
    });
    expect.assertions(1);
    await expect(api.searchVideos(searchText)).rejects.toStrictEqual({
      error: 'Deu ruim no fetch',
    });
  });

  test('getVideoInfo', () => {
    const videoId = 'F2lklMky2N0';
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockGetVideoInfo),
      })
    );

    return api.getVideoInfo(videoId).then((videos) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /https:\/\/www.googleapis.com\/youtube\/v3\/videos/
        )
      );
      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(videoId));
      expect(videos).toStrictEqual(mockGetVideoInfo);
    });
  });
  test('getVideoInfo testando o reject', async () => {
    const videoId = 'F2lklMky2N0';

    jest.spyOn(global, 'fetch').mockRejectedValue({
      error: 'Deu ruim no fetch',
    });
    expect.assertions(1);
    await expect(api.getVideoInfo(videoId)).rejects.toStrictEqual({
      error: 'Deu ruim no fetch',
    });
  });

  test('getVideoComments', () => {
    const videoId = 'F2lklMky2N0';
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockGetVideoComments),
      })
    );

    return api.getVideoComments(videoId).then((videos) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /https:\/\/www.googleapis.com\/youtube\/v3\/commentThreads/
        )
      );
      expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(videoId));
      expect(videos).toStrictEqual(mockGetVideoComments);
    });
  });

  test('getVideoComments testando o reject', async () => {
    const videoId = 'F2lklMky2N0';

    jest.spyOn(global, 'fetch').mockRejectedValue({
      error: 'Deu ruim no fetch',
    });
    expect.assertions(1);
    await expect(api.getVideoComments(videoId)).rejects.toStrictEqual({
      error: 'Deu ruim no fetch',
    });
  });
});
