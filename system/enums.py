import enum

class SubmissionStatus(str, enum.Enum):
    wrong_answer = 'WRONG ANSWER'
    accepted = 'ACCEPTED'
    compilation_error = 'COMPILATION_ERROR'
    runtime_error = 'RUNTIME_ERROR'
    time_limit_exceeded = 'TIME_LIMIT_EXCEEDED'
    pending = 'PENDING'
    running = 'RUNNING'
    memory_limit_exceeded = 'MEMORY_LIMIT_EXCEEDED'
    server_error = 'SERVER_ERROR'