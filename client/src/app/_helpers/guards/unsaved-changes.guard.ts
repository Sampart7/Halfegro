import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ConfirmService } from 'src/app/services/confirm.service';
import { UserEditComponent } from 'src/app/_components/user-edit/user-edit.component';

export const unsavedChangesGuard: CanDeactivateFn<UserEditComponent> = (component) => {
  const confirmService = inject(ConfirmService);
  
  if(component.editForm?.dirty) return confirmService.confirm();

  return true;
};
