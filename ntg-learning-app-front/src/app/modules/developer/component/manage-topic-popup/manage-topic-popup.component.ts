import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-topic-popup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-topic-popup.component.html',
  styleUrl: './manage-topic-popup.component.css'
})
export class ManageTopicPopupComponent {

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  addTopicForm!: FormGroup;

  constructor(private fb: FormBuilder){
     this.addTopicForm = fb.group({
        topicName: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', [Validators.required, Validators.minLength(5)]],
        category: ['', Validators.required],
        status: ['NOT_STARTED', Validators.required]
     });
  }

  closePopup() {
    this.close.emit();
    this.addTopicForm.reset();
  }

  onSubmit() {
    if (this.addTopicForm.valid) {
      console.log('Form submitted:', this.addTopicForm.value);
      // Add your service call here to save the topic
      this.closePopup();
    }
  }
}