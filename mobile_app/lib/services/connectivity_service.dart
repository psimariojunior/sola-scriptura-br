import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';

enum ConnectivityStatus { online, offline, unknown }

class ConnectivityService {
  final Connectivity _connectivity = Connectivity();
  final StreamController<ConnectivityStatus> _controller =
      StreamController<ConnectivityStatus>.broadcast();

  ConnectivityStatus _status = ConnectivityStatus.unknown;
  StreamSubscription<List<ConnectivityResult>>? _subscription;

  ConnectivityStatus get currentStatus => _status;
  Stream<ConnectivityStatus> get statusStream => _controller.stream;
  bool get isOnline => _status == ConnectivityStatus.online;
  bool get isOffline => _status == ConnectivityStatus.offline;

  void initialize() {
    _checkInitialStatus();
    _subscription = _connectivity.onConnectivityChanged.listen(_onConnectivityChanged);
  }

  Future<void> _checkInitialStatus() async {
    try {
      final results = await _connectivity.checkConnectivity();
      _updateStatus(results);
    } catch (_) {
      _status = ConnectivityStatus.unknown;
    }
  }

  void _onConnectivityChanged(List<ConnectivityResult> results) {
    _updateStatus(results);
  }

  void _updateStatus(List<ConnectivityResult> results) {
    final hasConnection = results.any((r) => r != ConnectivityResult.none);
    final newStatus = hasConnection ? ConnectivityStatus.online : ConnectivityStatus.offline;

    if (newStatus != _status) {
      _status = newStatus;
      _controller.add(_status);
    }
  }

  void dispose() {
    _subscription?.cancel();
    _controller.close();
  }
}
