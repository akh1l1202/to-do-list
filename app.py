from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

# Sample in-memory task list
tasks = []

# Route to serve the index.html page
@app.route('/')
def index():
    return render_template('index.html')

# Route to get all tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# Route to add a new task
@app.route('/add-task', methods=['POST'])
def add_task():
    task_data = request.get_json()
    task = task_data['task']
    tasks.append(task)
    return jsonify({'message': 'Task added successfully'})

# Route to delete a task
@app.route('/delete-task', methods=['POST'])
def delete_task():
    task_data = request.get_json()
    task = task_data['task']
    if task in tasks:
        tasks.remove(task)
        return jsonify({'message': 'Task deleted successfully'})
    return jsonify({'message': 'Task not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
