# Install dependencies:
# pip install transformers torch rapidfuzz

import random
from rapidfuzz import fuzz
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import json

# -----------------------------
# 1️⃣ Load dataset
# -----------------------------
with open("enhanced_ai_chatbot_dataset.json", "r") as f:
    data = json.load(f)

# -----------------------------
# 2️⃣ Load small talk model (DialoGPT)
# -----------------------------
chat_tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-small")
chat_model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-small")

# -----------------------------
# 3️⃣ Helper functions
# -----------------------------
def compute_similarity(student_ans, correct_ans):
    return fuzz.token_sort_ratio(student_ans.lower(), correct_ans.lower())

def provide_feedback(score, student_ans, correct_ans, hint):
    if score > 75:
        return f"Excellent! ✅ Your answer '{student_ans}' is correct."
    elif score > 40:
        return f"You're close! Hint: {hint}"
    else:
        return f"Not quite right. Let's learn this properly."

def generate_small_talk(prompt):
    inputs = chat_tokenizer.encode(prompt + chat_tokenizer.eos_token, return_tensors="pt")
    reply_ids = chat_model.generate(inputs, max_length=50, do_sample=True, top_k=50, top_p=0.95)
    reply = chat_tokenizer.decode(reply_ids[:, inputs.shape[-1]:][0], skip_special_tokens=True)
    return reply

def get_next_question(used_ids):
    remaining = [item for item in data if item['id'] not in used_ids]
    return random.choice(remaining) if remaining else None

# -----------------------------
# 4️⃣ Main loop
# -----------------------------
used_ids = set()
conversation_history = ""

print("🤖 AI Teacher: Hello! Welcome to today's lesson.\n")

while True:
    # Occasionally generate small talk
    if random.random() < 0.3:
        prompt = "Student: Hi\nTeacher:"
        talk = generate_small_talk(prompt)
        print(f"Teacher (small talk): {talk}\n")
        conversation_history += f"Teacher: {talk}\n"

    # Get next dataset question
    item = get_next_question(used_ids)
    if not item:
        print("🤖 AI Teacher: That's all for today! Great job! 🎉 Keep practicing!")
        break

    used_ids.add(item['id'])

    # Ask the question
    if item['type'] == "concept":
        print(f"Teacher: {item['question']}")
    else:
        options = ", ".join(item['options'])
        print(f"Teacher: {item['question']} Options: {options}")

    # Student input
    student_ans = input("You: ")

    # Check answer
    score = compute_similarity(student_ans, item['answer'])
    feedback = provide_feedback(score, student_ans, item['answer'], item.get('hint', ''))
    print(f"Teacher: {feedback}")

    # Teach topic
    print(f"Teacher: Here's more about it: {item['explanation']}\n")

    # Update conversation history
    conversation_history += f"Teacher: {item['question']}\nStudent: {student_ans}\n"
