namespace Lamp
{
	public class NamedEntity : INamedEntity
	{
		public string Name { get; protected set; }

		public NamedEntity(string name)
		{
			Name = name;
		}
	}
}
