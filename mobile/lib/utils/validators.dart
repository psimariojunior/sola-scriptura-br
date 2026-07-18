class Validators {
  Validators._();

  static String? required(String? value, [String? fieldName]) {
    if (value == null || value.trim().isEmpty) {
      return '${fieldName ?? 'Campo'} obrigatorio';
    }
    return null;
  }

  static String? email(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Email obrigatorio';
    }
    final emailRegex = RegExp(r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$');
    if (!emailRegex.hasMatch(value.trim())) {
      return 'Email invalido';
    }
    return null;
  }

  static String? password(String? value) {
    if (value == null || value.isEmpty) {
      return 'Senha obrigatoria';
    }
    if (value.length < 8) {
      return 'Minimo 8 caracteres';
    }
    return null;
  }

  static String? confirmPassword(String? value, String password) {
    if (value == null || value.isEmpty) {
      return 'Confirmacao obrigatoria';
    }
    if (value != password) {
      return 'Senhas nao conferem';
    }
    return null;
  }

  static String? minLength(String? value, int min, [String? fieldName]) {
    if (value == null || value.length < min) {
      return '${fieldName ?? 'Campo'} deve ter no minimo $min caracteres';
    }
    return null;
  }

  static String? maxLength(String? value, int max, [String? fieldName]) {
    if (value != null && value.length > max) {
      return '${fieldName ?? 'Campo'} deve ter no maximo $max caracteres';
    }
    return null;
  }
}
