import '../config/api_config.dart';
import '../models/audio.dart';
import 'api_client.dart';

class AudioService {
  final ApiClient _client;

  AudioService(this._client);

  Future<AudioInfo?> getAudioCapitulo({
    required String livro,
    required int capitulo,
    required String traducao,
  }) async {
    final response = await _client.get(
      ApiConfig.endpoint('audio'),
      queryParameters: {
        'livro': livro,
        'capitulo': capitulo,
        'traducao': traducao,
      },
    );

    final data = response.data;
    if (data is Map<String, dynamic> && data['data'] != null) {
      return AudioInfo.fromJson(data['data'] as Map<String, dynamic>);
    }
    return null;
  }
}
