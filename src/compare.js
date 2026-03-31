export function compareUsers(A, B) {
  const A_completed = A.completed;
  const A_planning = A.planning;
  const B_completed = B.completed;

  const recommendations = Object.keys(B_completed).filter(
    title => A_planning.has(title)
  );

  const common = Object.keys(A_completed).filter(
    title => title in B_completed
  );

  const uniqueA = Object.keys(A_completed).filter(
    title => !(title in B_completed)
  );

  const uniqueB = Object.keys(B_completed).filter(
    title => !(title in A_completed)
  );

  return {
    recommendations,
    common,
    uniqueA,
    uniqueB
  };
}
