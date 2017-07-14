import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsGraphComponent } from './tools-graph.component';

describe('ToolsGraphComponent', () => {
  let component: ToolsGraphComponent;
  let fixture: ComponentFixture<ToolsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
