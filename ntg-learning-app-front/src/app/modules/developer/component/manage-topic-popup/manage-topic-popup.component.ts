import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-topic-popup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-topic-popup.component.html',
  styleUrl: './manage-topic-popup.component.css'
})
export class ManageTopicPopupComponent {

  @Input() isOpen = false;

  addTopicForm!: FormGroup;

  constructor(private fb: FormBuilder){
     this.addTopicForm = fb.group({
      
     })

  }

}
