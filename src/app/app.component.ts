import { Component, computed, effect, signal } from '@angular/core';

interface User {
  id: number;
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'signals';

  search = signal<string>(localStorage.getItem('searchString') ?? '')
  users = signal<User[]>([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ])

  logger = effect(() => {
    localStorage.setItem('searchString', this.search())
  })

  filteredUsers = computed(() =>
    this.users().filter(user =>
      user.name.toLowerCase().startsWith(
        this.search().toLowerCase()
      )
    ));

  setSearchString(e: Event): void {
    this.search.set(
      (e.target as HTMLInputElement).value
    )
  }

  addUser(): void {
    this.users.update(
      users => {
        const lastId: number = users.length;
        const nextId: number = lastId + 1;
        return [...users, { id: nextId + 1, name: 'User ' + nextId.toString() }]
      }
    )
  }

}
