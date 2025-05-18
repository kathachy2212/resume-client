import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../interfaces/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill',
  standalone: false,
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent implements OnInit {
  skillForm: FormGroup;
  skills: Skill[] = [];
  skillIdToEdit: number | null = null;
  isEditing: boolean = false;

  constructor(
    private skillService: SkillService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getSkills().subscribe((data) => {
      this.skills = data;
    });
  }

  onSubmit(): void {
    if (this.skillForm.valid) {
      const skill: Skill = this.skillForm.value;

      if (this.isEditing && this.skillIdToEdit) {
        this.skillService
          .updateSkill(this.skillIdToEdit, skill)
          .subscribe(() => {
            this.loadSkills();
            this.resetForm();
          });
      } else {
        this.skillService.addSkill(skill).subscribe(() => {
          this.loadSkills();
          this.resetForm();
        });
      }
    }
  }

  onEdit(skill: Skill): void {
    this.isEditing = true;
    this.skillIdToEdit = skill.id;
    this.skillForm.setValue({ name: skill.name });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this skill?')) {
      this.skillService.deleteSkill(id).subscribe(() => {
        this.loadSkills();
      });
    }
  }

  resetForm(): void {
    this.skillForm.reset();
    this.isEditing = false;
    this.skillIdToEdit = null;
  }

}
