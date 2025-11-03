class Task {
  String id;
  String title;
  String description;
  String status;
  DateTime? deadline;

  Task({
    required this.id,
    required this.title,
    required this.description,
    required this.status,
    this.deadline,
  });

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      id: json['_id']?.toString() ?? json['id']?.toString() ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      status: json['status'] ?? 'pending',
      deadline: json['deadline'] != null ? DateTime.tryParse(json['deadline']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'status': status,
      'deadline': deadline?.toIso8601String(),
    };
  }
}
