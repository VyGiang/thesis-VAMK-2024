import { IFamilyMember, Relationship } from "@/lib/DataInterfaces";

export class FamilyMember implements IFamilyMember {
  name: string;
  memberId: number;
  age: number;
  relationship: Relationship;
  avatarUrl?: string;

  constructor(member: IFamilyMember) {
    this.name = member.name;
    this.memberId = member.memberId;
    this.age = member.age;
    this.relationship = member.relationship;
    this.avatarUrl = member.avatarUrl;
  }

  // Example method
  greet() {
    console.log(`Hello, my name is ${this.name}!`);
  }
}
