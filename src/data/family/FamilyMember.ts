import { IFamilyMember, Relationship } from "@/lib/DataInterfaces"
import { Timestamp } from "@firebase/firestore"

export class FamilyMember implements IFamilyMember {
  name: string
  memberId: number
  age: number
  relationship: Relationship
  avatarUrl?: string
  birthday?: Timestamp // Added the optional birthday property

  constructor(member: IFamilyMember) {
    this.name = member.name
    this.memberId = member.memberId
    this.age = member.age
    this.relationship = member.relationship
    this.avatarUrl = member.avatarUrl
    this.birthday = member.birthday // Assigning birthday from the member object
  }

  // Example method
  greet() {
    console.log(
      `Hello, my name is ${this.name}! I was born on ${this.birthday}.`
    )
  }
}
