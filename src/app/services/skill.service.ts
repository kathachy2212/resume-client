import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../interfaces/models';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = 'http://localhost:8000/api/skills/'; // Your API URL

  constructor(private http: HttpClient) {}

  // Get all skills
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }

  // Get a single skill by ID
  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  // Add a new skill
  addSkill(skill: Skill): Observable<Skill> {
    const token = localStorage.getItem('token'); // Get the token from localStorage (or other place you store it)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,  // Add the token in the Authorization header
    });

    return this.http.post<Skill>(this.apiUrl, skill, { headers });
  }

  // Update an existing skill
  updateSkill(id: number, skill: Skill): Observable<Skill> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<Skill>(`${this.apiUrl}${id}/`, skill, { headers });
  }

  // Delete a skill
 deleteSkill(id: number): Observable<void> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers });
  }
}
