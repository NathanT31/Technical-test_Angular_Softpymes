import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconContact } from '../icons/contact';
import { IconPlus } from '../icons/plus';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="border-b border-gray-500/50 mb-8">
      <div
        class="flex px-4 xl:px-0 w-full max-w-[1200px] m-auto py-6 items-center"
      >
        <a routerLink="/dashboard" class="flex gap-x-4 w-full">
          <app-icon-contact />
          <p>Products</p>
        </a>
        <a
          class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
          routerLink="/dashboard/create"
        >
          <app-icon-plus class="size-4" />
          Create new product
        </a>
      </div>
    </nav>
  `,
  imports: [IconContact, IconPlus, RouterLink],
})
export class NavbarComponent {}
